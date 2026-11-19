# DeliverIQ
Food Delivery Operations and Performance Analytics System
# DeliverIQ – Food Delivery Operations and Performance Analytics System

DeliverIQ is a database-driven food delivery analytics system designed to organize, manage, and analyze food delivery operations.

The project uses a relational database to store order details, delivery personnel information, and geographical location data. It provides an interactive dashboard to analyze delivery performance and understand how factors such as weather conditions, road traffic, and vehicle conditions are associated with delivery times.

## Features

- **Interactive Dashboard:** Displays key delivery performance metrics and visual summaries.
- **Order Management:** Explore and view food delivery order records.
- **Delivery Analytics:** Analyze delivery times based on weather, traffic, and vehicle conditions.
- **Personnel Analysis:** Examine delivery personnel performance and delivery statistics.
- **Location Analysis:** View restaurant and delivery location information.
- **SQL-Based Analysis:** Uses relational database operations and joins to generate insights.
- **Report Generation:** Generate and download delivery performance, traffic, and personnel reports in CSV format.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| Database | MySQL 8.0 |
| Database Connectivity | MySQL Connector for Python |
| Data Processing | Pandas |
| Data Visualization | Chart.js |
| Development Tools | VS Code, MySQL Workbench |

## Database Design

The project uses a relational database named `DeliverIQ`, consisting of three main tables:

### 1. Orders
Stores order-related information, including:
- Order ID
- Order date and time
- Weather conditions
- Road traffic density
- Vehicle condition
- Type of order and vehicle
- City
- Delivery time

### 2. Locations
Stores geographical information:
- Order ID
- Restaurant latitude and longitude
- Delivery location latitude and longitude

### 3. Delivery Records
Stores delivery personnel information:
- Order ID
- Delivery person ID
- Delivery person age
- Delivery person ratings

**Relationships:**
- `orders.ID` is the primary key of the orders table.
- `locations.ID` references `orders.ID`.
- `delivery_records.ID` references `orders.ID`.

Primary key and foreign key constraints maintain referential integrity across the database.

## Dataset

The project uses three CSV datasets:

- `order_details_table.csv`
- `location_details_table.csv`
- `delivery_person_table.csv`

**Dataset source:** [Food Delivery Dataset – GitHub](https://github.com/Ritik1129/Food_Delivery_Dataset)

Each imported table contains 45,593 records.

## Project Structure

```text
DeliverIQ/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   └── test_db.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── orders.html
│   ├── analytics.html
│   ├── personnel.html
│   ├── locations.html
│   └── reports.html
│
├── datasets/
│   ├── order_details_table.csv
│   ├── location_details_table.csv
│   └── delivery_person_table.csv
│
├── sql/
│   ├── create_database.sql
│   ├── create_tables.sql
│   ├── import_data.sql
│   ├── constraints.sql
│   ├── normalization.sql
│   └── joins.sql
│
├── documentation/
│   ├── ER_Diagram.png
│   └── screenshots/
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Python 3.12 or later
- MySQL Server 8.0
- MySQL Workbench
- Visual Studio Code
- VS Code Live Server extension

### Step 1: Clone the Repository

```bash
git clone https://github.com/Siya1906/DeliverIQ.git
cd DeliverIQ
```

### Step 2: Set Up the Database

1. Open MySQL Workbench.
2. Create the database using the SQL scripts in the `sql` folder.
3. Create the three tables and establish their primary key and foreign key relationships.
4. Import the provided datasets into the corresponding tables.

### Step 3: Configure the Backend

Navigate to the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
DB_PASSWORD=your_mysql_password
```

Replace the placeholder with your own local MySQL password. Do not upload this file to GitHub.

### Step 4: Run the Flask Backend

```bash
python app.py
```

The backend runs locally at:

`http://127.0.0.1:5000`

### Step 5: Run the Frontend

1. Open the `frontend` folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.
4. The DeliverIQ dashboard will open in your browser.

## Key Learning Outcomes

- Relational database design and implementation
- Primary key and foreign key constraints
- Database normalization concepts
- SQL joins and aggregate functions
- Data analysis using SQL
- Backend integration with MySQL
- Building an interactive web dashboard
- Generating downloadable analytical reports

## Future Scope

- Add predictive models for estimating delivery times.
- Introduce real-time delivery tracking.
- Expand operational analytics and reporting.
- Add role-based access and user authentication.

## Contributors

Developed as an Advanced Database Management Systems academic mini-project.

## License

This project is intended for academic and educational purposes.
