"""Integration tests using the locally trained Random Forest artifact."""
import json
from pathlib import Path
import tempfile
import unittest

import joblib
import pandas as pd

from app import create_app, MODEL_PATH
from model.features import FEATURES


class PredictionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not MODEL_PATH.exists():
            raise RuntimeError('Run npm run train:model before these tests.')
        cls.app = create_app()
        cls.app.config['TESTING'] = True
        cls.model = joblib.load(MODEL_PATH)
        data_path = Path(__file__).resolve().parents[2] / 'data' / 'student-por.csv'
        cls.student = pd.read_csv(data_path, sep=';')[FEATURES].iloc[0].to_dict()

    def setUp(self):
        self.client = self.app.test_client()

    def test_health_and_real_model_prediction(self):
        self.assertEqual(self.client.get('/api/prediction/health').json['status'], 'ready')
        response = self.client.post('/api/prediction/predict', json=self.student)
        self.assertEqual(response.status_code, 200)
        expected = round(float(self.model.predict(pd.DataFrame([self.student], columns=FEATURES))[0]), 2)
        self.assertEqual(response.json['predicted_grade'], expected)
        self.assertTrue(0 <= expected <= 20)
        self.assertEqual(response.headers['Cache-Control'], 'no-store')
        self.assertNotIn('G1', self.model.feature_names_in_)
        self.assertNotIn('G2', self.model.feature_names_in_)

    def test_legacy_route_and_scenario(self):
        scenario = {**self.student, 'studytime': 4, 'absences': 0}
        response = self.client.post('/predict', json=scenario)
        self.assertEqual(response.status_code, 200)
        expected = round(float(self.model.predict(pd.DataFrame([scenario], columns=FEATURES))[0]), 2)
        self.assertEqual(response.json['predicted_grade'], expected)

    def test_missing_and_unknown_fields(self):
        missing = dict(self.student)
        del missing['school']
        response = self.client.post('/predict', json=missing)
        self.assertEqual(response.status_code, 400)
        self.assertIn('school', response.json['errors'])
        for key in ['G1', 'G2', 'G3', 'unexpected']:
            with self.subTest(key=key):
                response = self.client.post('/predict', json={**self.student, key: 10})
                self.assertEqual(response.status_code, 400)
                self.assertIn(key, response.json['errors'])

    def test_invalid_field_values(self):
        for key, value in [('school', 'unknown'), ('Mjob', []), ('age', True), ('age', '17'), ('age', 17.5), ('age', 10**1000), ('studytime', 5), ('absences', -1), ('health', None), ('age', float('nan'))]:
            with self.subTest(key=key, value=str(value)[:30]):
                response = self.client.post('/predict', json={**self.student, key: value})
                self.assertEqual(response.status_code, 400)
                self.assertIn(key, response.json['errors'])

    def test_bad_request_formats(self):
        for data in [[], None, 'text']:
            response = self.client.post('/predict', data=json.dumps(data), content_type='application/json')
            self.assertEqual(response.status_code, 400)
        self.assertEqual(self.client.post('/predict', data='{', content_type='application/json').status_code, 400)
        self.assertEqual(self.client.post('/predict', data='text').status_code, 415)
        self.assertEqual(self.client.post('/predict', data='x'*17000, content_type='application/json').status_code, 413)

    def test_missing_model_does_not_crash_server(self):
        with tempfile.TemporaryDirectory() as folder:
            client = create_app(Path(folder) / 'missing.pkl').test_client()
            self.assertEqual(client.get('/health').status_code, 503)
            response = client.post('/predict', json=self.student)
            self.assertEqual(response.status_code, 503)
            self.assertIn('not ready', response.json['message'])

    def test_cors_restricts_external_origins(self):
        allowed = self.client.get('/health', headers={'Origin': 'http://localhost:5173'})
        self.assertEqual(allowed.headers['Access-Control-Allow-Origin'], 'http://localhost:5173')
        blocked = self.client.get('/health', headers={'Origin': 'https://untrusted.example'})
        self.assertNotIn('Access-Control-Allow-Origin', blocked.headers)


if __name__ == '__main__':
    unittest.main()
