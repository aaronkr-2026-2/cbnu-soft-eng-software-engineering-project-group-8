import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor


# 1. Load the dataset
data_path = "../../data/student-por.csv"
df = pd.read_csv(data_path, sep=";")


# 2. Select features and target
# G1 and G2 are excluded because they are previous grades.
X = df.drop(columns=["G1", "G2", "G3"])
y = df["G3"]


# 3. Identify categorical and numerical columns
categorical_columns = X.select_dtypes(include=["object"]).columns.tolist()
numerical_columns = X.select_dtypes(exclude=["object"]).columns.tolist()


# 4. Create preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_columns,
        ),
        (
            "numerical",
            "passthrough",
            numerical_columns,
        ),
    ]
)


# 5. Create Random Forest model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


# 6. Create complete pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)


# 7. Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# 8. Train the model
pipeline.fit(X_train, y_train)


# 9. Save the trained model
joblib.dump(
    pipeline,
    "student_model.pkl"
)


print("Model trained successfully.")
print("Model saved as student_model.pkl")