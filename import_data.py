
import pandas as pd
import mysql.connector
from getpass import getpass
from pathlib import Path

# Project folders
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "datasets"

# Ask for MySQL password securely
password = getpass("Enter your MySQL root password: ")

try:
    # Connect to MySQL
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password=password,
        database="DeliverIQ"
    )

    cursor = connection.cursor()
    print("\nConnected to DeliverIQ successfully!")

    # Define datasets and their corresponding tables
    datasets = [
        {
            "file": "order_details_table.csv",
            "table": "orders",
            "columns": [
                "ID", "Order_Date", "Time_Orderd",
                "Time_Order_picked", "Weatherconditions",
                "Road_traffic_density", "Vehicle_condition",
                "Type_of_order", "Type_of_vehicle",
                "multiple_deliveries", "Festival", "City",
                "Time_taken(min)"
            ],
            "integer_columns": [
                "Vehicle_condition",
                "multiple_deliveries",
                "Time_taken(min)"
            ],
            "decimal_columns": []
        },
        {
            "file": "location_details_table.csv",
            "table": "locations",
            "columns": [
                "ID", "Restaurant_latitude",
                "Restaurant_longitude",
                "Delivery_location_latitude",
                "Delivery_location_longitude"
            ],
            "integer_columns": [],
            "decimal_columns": [
                "Restaurant_latitude",
                "Restaurant_longitude",
                "Delivery_location_latitude",
                "Delivery_location_longitude"
            ]
        },
        {
            "file": "delivery_person_table.csv",
            "table": "delivery_records",
            "columns": [
                "ID", "Delivery_person_ID",
                "Delivery_person_Age",
                "Delivery_person_Ratings"
            ],
            "integer_columns": [],
            "decimal_columns": [
                "Delivery_person_Age",
                "Delivery_person_Ratings"
            ]
        }
    ]

    # Import each dataset
    for dataset in datasets:

        file_path = DATA_DIR / dataset["file"]
        table = dataset["table"]
        columns = dataset["columns"]

        print(f"\nReading {dataset['file']}...")

        df = pd.read_csv(
            file_path,
            dtype={"ID": str}
        )

        # Check that CSV columns match the expected structure
        missing_columns = set(columns) - set(df.columns)

        if missing_columns:
            raise ValueError(
                f"Missing columns in {dataset['file']}: {missing_columns}"
            )

        # Prepare SQL INSERT statement
        column_names = ", ".join(f"`{col}`" for col in columns)
        placeholders = ", ".join(["%s"] * len(columns))

        sql = (
            f"INSERT INTO `{table}` ({column_names}) "
            f"VALUES ({placeholders})"
        )

        records = []

        for row in df[columns].itertuples(index=False, name=None):
            cleaned_row = []

            for col, value in zip(columns, row):

                if pd.isna(value):
                    cleaned_row.append(None)

                elif col in dataset["integer_columns"]:
                    value = str(value).strip()
                    
                    if col == "Time_taken(min)":
                        value = value.replace("(min)", "").strip()
                    
                    if value.lower() in ["nan", "none", ""]:
                        cleaned_row.append(None)
                        
                    else:
                        cleaned_row.append(int(float(value)))
                elif col in dataset["decimal_columns"]:
                    cleaned_row.append(float(value))

                else:
                    cleaned_row.append(str(value).strip())

            records.append(tuple(cleaned_row))

        # Insert records in batches of 1000
        batch_size = 1000

        for start in range(0, len(records), batch_size):
            batch = records[start:start + batch_size]
            cursor.executemany(sql, batch)

        connection.commit()

        print(
            f"Successfully imported {len(records)} rows "
            f"into {table}!"
        )

    print("\nAll three datasets imported successfully!")

    # Verify record counts
    print("\nDATABASE VERIFICATION:")

    for table in ["orders", "locations", "delivery_records"]:
        cursor.execute(f"SELECT COUNT(*) FROM `{table}`")
        count = cursor.fetchone()[0]
        print(f"{table}: {count} records")

except Exception as error:
    if "connection" in locals() and connection.is_connected():
        connection.rollback()

    print("\nERROR:", error)

finally:
    if "cursor" in locals():
        cursor.close()

    if "connection" in locals() and connection.is_connected():
        connection.close()

    print("\nDatabase connection closed.")
