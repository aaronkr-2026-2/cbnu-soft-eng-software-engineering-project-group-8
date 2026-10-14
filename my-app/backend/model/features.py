"""Shared input contract for training and inference; previous grades are excluded."""
import math

CATEGORIES = {
    'school': ['GP', 'MS'], 'sex': ['F', 'M'], 'address': ['U', 'R'],
    'famsize': ['LE3', 'GT3'], 'Pstatus': ['T', 'A'],
    'Mjob': ['teacher', 'health', 'services', 'at_home', 'other'],
    'Fjob': ['teacher', 'health', 'services', 'at_home', 'other'],
    'reason': ['home', 'reputation', 'course', 'other'], 'guardian': ['mother', 'father', 'other'],
    **{key: ['yes', 'no'] for key in ['schoolsup', 'famsup', 'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic']},
}
RANGES = {
    'age': (15, 22), 'Medu': (0, 4), 'Fedu': (0, 4), 'traveltime': (1, 4),
    'studytime': (1, 4), 'failures': (0, 4), 'famrel': (1, 5), 'freetime': (1, 5),
    'goout': (1, 5), 'Dalc': (1, 5), 'Walc': (1, 5), 'health': (1, 5), 'absences': (0, 93),
}
FEATURES = list(CATEGORIES) + list(RANGES)


def validate_student(data):
    if not isinstance(data, dict):
        return {'body': 'Expected a JSON object containing 30 student features.'}
    errors = {key: 'This field is required.' for key in FEATURES if key not in data}
    for key in data.keys() - set(FEATURES):
        errors[key] = 'Unexpected field. G1, G2 and G3 must not be provided.'
    for key, choices in CATEGORIES.items():
        if key in data and (not isinstance(data[key], str) or data[key] not in choices):
            errors[key] = 'Choose one of: ' + ', '.join(choices)
    for key, (minimum, maximum) in RANGES.items():
        if key not in data:
            continue
        value = data[key]
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not minimum <= value <= maximum or not math.isfinite(value) or value != int(value):
            errors[key] = f'Enter a whole number from {minimum} to {maximum}.'
    return errors
