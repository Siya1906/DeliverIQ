import mysql.connector
from getpass import getpass

password = getpass("Enter your new MySQL password: ")

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password=password,
        database="DeliverIQ"
    )

    print("Connected to DeliverIQ successfully!")
    connection.close()

except mysql.connector.Error as error:
    print("Connection failed:", error)