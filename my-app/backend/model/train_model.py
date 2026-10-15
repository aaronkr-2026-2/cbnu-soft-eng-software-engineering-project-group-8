"""Train, evaluate and save the complete Random Forest preprocessing pipeline."""
import argparse
import json
from pathlib import Path

import joblib
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

from features import CATEGORIES, FEATURES, RANGES, validate_student

MODEL_DIR = Path(__file__).resolve().parent
DEFAULT_DATA = MODEL_DIR.parents[1] / 'data' / 'student-por.csv'


def train_and_save(data_path=DEFAULT_DATA, output_path=MODEL_DIR / 'student_model.pkl'):
    data = pd.read_csv(data_path, sep=';')
    missing = set(FEATURES + ['G3']) - set(data.columns)
    if missing:
        raise ValueError(f'Dataset is missing columns: {sorted(missing)}')
    if len(data) < 10:
        raise ValueError('At least 10 labeled records are required.')
    for index, row in enumerate(data[FEATURES].to_dict(orient='records')):
        errors = validate_student(row)
        if errors:
            raise ValueError(f'Invalid training row {index + 1}: {errors}')
    target = pd.to_numeric(data['G3'], errors='coerce')
    if target.isna().any() or not target.between(0, 20).all() or not (target % 1 == 0).all():
        raise ValueError('G3 must contain whole-number grades from 0 to 20.')
    pipeline = Pipeline([
        ('preprocessor', ColumnTransformer([
            ('categorical', OneHotEncoder(handle_unknown='ignore'), list(CATEGORIES)),
            ('numerical', 'passthrough', list(RANGES)),
        ])),
        ('model', RandomForestRegressor(n_estimators=200, min_samples_leaf=2, random_state=42, n_jobs=-1)),
    ])
    x_train, x_test, y_train, y_test = train_test_split(data[FEATURES], target, test_size=0.2, random_state=42)
    pipeline.fit(x_train, y_train)
    predictions = pipeline.predict(x_test)
    report = {
        'model': 'RandomForestRegressor', 'dataset': Path(data_path).name,
        'features': FEATURES, 'excluded_grades': ['G1', 'G2'], 'target': 'G3',
        'train_rows': len(x_train), 'test_rows': len(x_test), 'random_state': 42,
        'sklearn_version': sklearn.__version__,
        'metrics': {'mae': float(mean_absolute_error(y_test, predictions)),
                    'rmse': float(mean_squared_error(y_test, predictions) ** 0.5),
                    'r2': float(r2_score(y_test, predictions))},
    }
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, output_path)
    output_path.with_suffix('.metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))
    print(f'Model saved to {output_path}')
    return pipeline, report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data', type=Path, default=DEFAULT_DATA)
    parser.add_argument('--output', type=Path, default=MODEL_DIR / 'student_model.pkl')
    args = parser.parse_args()
    train_and_save(args.data, args.output)


if __name__ == '__main__':
    main()
