import pandas as pd

from sklearn.model_selection import KFold, cross_validate
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor


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


# 4. Preprocessing
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


# 5. Define models
models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ),
    "Gradient Boosting": GradientBoostingRegressor(
        n_estimators=100,
        random_state=42
    )
}


# 6. Five-fold cross-validation
cv = KFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)


# 7. Evaluate each model
for name, model in models.items():

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", model),
        ]
    )

    scores = cross_validate(
        pipeline,
        X,
        y,
        cv=cv,
        scoring={
            "MAE": "neg_mean_absolute_error",
            "RMSE": "neg_root_mean_squared_error",
            "R2": "r2"
        }
    )

    mae = -scores["test_MAE"].mean()
    rmse = -scores["test_RMSE"].mean()
    r2 = scores["test_R2"].mean()

    print("\n" + name)
    print("-" * len(name))
    print(f"Mean MAE:  {mae:.2f}")
    print(f"Mean RMSE: {rmse:.2f}")
    print(f"Mean R²:   {r2:.2f}")