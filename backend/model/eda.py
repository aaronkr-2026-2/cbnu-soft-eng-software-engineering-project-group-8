import pandas as pd


# Load the dataset
data_path = "../../data/student-por.csv"
df = pd.read_csv(data_path, sep=";")


print("Dataset Shape")
print("-------------")
print(df.shape)

print("\nColumn Names")
print("------------")
print(df.columns.tolist())

print("\nMissing Values")
print("--------------")
print(df.isnull().sum())

print("\nData Types")
print("----------")
print(df.dtypes)

print("\nFinal Grade Statistics")
print("----------------------")
print(df["G3"].describe())

print("\nFinal Grade Distribution")
print("------------------------")
print(df["G3"].value_counts().sort_index())