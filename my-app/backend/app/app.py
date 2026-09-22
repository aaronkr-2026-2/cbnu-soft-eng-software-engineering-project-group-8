from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "student_model.pkl")


model = joblib.load(MODEL_PATH)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Student Performance Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    student_data = request.get_json()

    student_df = pd.DataFrame([student_data])
    prediction = model.predict(student_df)

    return jsonify({
        "predicted_grade": round(float(prediction[0]), 2)
    })


if __name__ == "__main__":
    app.run(debug=True)