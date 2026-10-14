"""Local Random Forest prediction API. Run after npm run train:model."""
import math
import os
from pathlib import Path
import sys

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import BadRequest, RequestEntityTooLarge

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))
from model.features import FEATURES, validate_student

MODEL_PATH = BACKEND_DIR / 'model' / 'student_model.pkl'


def create_app(model_path=MODEL_PATH):
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024
    CORS(app, origins=[os.environ.get('FRONTEND_ORIGIN', 'http://localhost:5173'), 'http://127.0.0.1:5173'])
    pipeline = None
    try:
        # Load only the locally trained artifact, never a user-uploaded pickle.
        pipeline = joblib.load(model_path)
        if set(pipeline.feature_names_in_) != set(FEATURES):
            raise ValueError('Model feature schema does not match the API.')
    except Exception:
        pipeline = None
        app.logger.warning('Prediction model unavailable. Run npm run train:model and restart the API.')

    @app.after_request
    def headers(response):
        response.headers['Cache-Control'] = 'no-store'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        return response

    @app.errorhandler(RequestEntityTooLarge)
    def too_large(_error):
        return jsonify(message='Request exceeds the 16 KB limit.'), 413

    @app.get('/')
    @app.get('/health')
    @app.get('/api/prediction/health')
    def health():
        return jsonify(status='ready' if pipeline is not None else 'unavailable', model='RandomForestRegressor', feature_count=len(FEATURES)), 200 if pipeline is not None else 503

    @app.post('/predict')
    @app.post('/api/prediction/predict')
    def predict():
        if not request.is_json:
            return jsonify(message='Content-Type must be application/json.'), 415
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify(message='Invalid JSON request.'), 400
        errors = validate_student(data)
        if errors:
            return jsonify(message='Please check the student profile.', errors=errors), 400
        if pipeline is None:
            return jsonify(message='The prediction model is not ready. Train the model and restart the prediction service.'), 503
        try:
            grade = float(pipeline.predict(pd.DataFrame([data], columns=FEATURES))[0])
            if not math.isfinite(grade) or not 0 <= grade <= 20:
                raise ValueError('Invalid prediction')
            return jsonify(predicted_grade=round(grade, 2), model='RandomForestRegressor', scale=[0, 20])
        except Exception:
            app.logger.exception('Prediction failed')
            return jsonify(message='Could not predict this profile. Please try again.'), 500

    return app


app = create_app()
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PREDICTION_PORT', '5000')), debug=False)
