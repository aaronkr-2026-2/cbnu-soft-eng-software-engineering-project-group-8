import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# 1. Load the dataset
data_path = "../../data/student-por.csv"

df = pd.read_csv(data_path, sep=";")


# 2. Select features and target
# We exclude G1 and G2 because they are previous grades.
X = df.drop(columns=["G1", "G2", "G3"])
y = df["G3"]


# 3. Identify categorical and numerical columns
categorical_columns = X.select_dtypes(include=["object"]).columns.tolist()
numerical_columns = X.select_dtypes(exclude=["object"]).columns.tolist()


# 4. Prepare preprocessing
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


# 5. Create the machine learning model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


# 6. Create the complete ML pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)


# 7. Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# 8. Train the model
pipeline.fit(X_train, y_train)


# 9. Make predictions
predictions = pipeline.predict(X_test)


# 10. Evaluate the model
mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = mse ** 0.5
r2 = r2_score(y_test, predictions)


print("Model Training Complete")
print("-----------------------")
print(f"MAE:  {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R²:   {r2:.2f}")