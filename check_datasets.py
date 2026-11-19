
import pandas as pd

df = pd.read_csv("datasets/delivery_person_table.csv")

print("Age values:")
print(sorted(df["Delivery_person_Age"].dropna().unique()))

print("\nRating values:")
print(sorted(df["Delivery_person_Ratings"].dropna().unique()))

print("\nSample records for one delivery person:")
person_id = df["Delivery_person_ID"].iloc[0]

print(
    df[df["Delivery_person_ID"] == person_id][
        ["ID", "Delivery_person_ID",
         "Delivery_person_Age", "Delivery_person_Ratings"]
    ].head(10).to_string(index=False)
)
