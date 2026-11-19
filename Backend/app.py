
from flask import Flask, jsonify
from flask_cors import CORS
from database import get_db_connection

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to DeliverIQ API!",
        "status": "Backend is running"
    })


# Dashboard statistics
@app.route("/api/dashboard")
def dashboard():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                COUNT(*) AS total_orders,
                ROUND(AVG(`Time_taken(min)`), 2) AS avg_delivery_time
            FROM orders
        """)
        order_stats = cursor.fetchone()

        cursor.execute("""
            SELECT
                COUNT(DISTINCT Delivery_person_ID) AS total_personnel,
                ROUND(AVG(Delivery_person_Ratings), 2) AS avg_rating
            FROM delivery_records
        """)
        personnel_stats = cursor.fetchone()

        cursor.close()
        connection.close()

        return jsonify({
            **order_stats,
            **personnel_stats
        })

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Delivery time by traffic density
@app.route("/api/traffic")
def traffic_analytics():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                Road_traffic_density AS traffic,
                ROUND(AVG(`Time_taken(min)`), 2) AS avg_time
            FROM orders
            GROUP BY Road_traffic_density
            ORDER BY avg_time
        """)

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(result)

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Delivery time by weather
@app.route("/api/weather")
def weather_analytics():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                Weatherconditions AS weather,
                ROUND(AVG(`Time_taken(min)`), 2) AS avg_time
            FROM orders
            GROUP BY Weatherconditions
            ORDER BY avg_time
        """)

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(result)

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Delivery time by vehicle condition
@app.route("/api/vehicle-condition")
def vehicle_condition_analytics():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                Vehicle_condition,
                COUNT(*) AS total_orders,
                ROUND(AVG(`Time_taken(min)`), 2) AS avg_delivery_time
            FROM orders
            GROUP BY Vehicle_condition
            ORDER BY Vehicle_condition
        """)

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(result)

    except Exception as error:
        return jsonify({"error": str(error)}), 500

# Get orders with pagination
@app.route("/api/orders")
def get_orders():
    try:
        from flask import request

        page = max(request.args.get("page", 1, type=int), 1)
        limit = 100
        offset = (page - 1) * limit

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT COUNT(*) AS total FROM orders")
        total = cursor.fetchone()["total"]

        cursor.execute("""
            SELECT
                ID,
                Order_Date,
                Weatherconditions,
                Road_traffic_density,
                City,
                `Time_taken(min)`
            FROM orders
            ORDER BY Order_Date DESC, ID
            LIMIT %s OFFSET %s
        """, (limit, offset))

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify({
            "orders": result,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        })

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Delivery personnel analytics
@app.route("/api/personnel")
def get_personnel():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                Delivery_person_ID,
                COUNT(*) AS total_deliveries,
                ROUND(AVG(Delivery_person_Age), 1) AS avg_age,
                ROUND(AVG(Delivery_person_Ratings), 2) AS avg_rating
            FROM delivery_records
            GROUP BY Delivery_person_ID
            ORDER BY total_deliveries DESC
        """)

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(result)

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Get delivery location records
@app.route("/api/locations")
def get_locations():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                l.ID,
                o.City,
                l.Restaurant_latitude,
                l.Restaurant_longitude,
                l.Delivery_location_latitude,
                l.Delivery_location_longitude,
                o.`Time_taken(min)` AS delivery_time
            FROM locations l
            INNER JOIN orders o
                ON l.ID = o.ID
            ORDER BY o.`Time_taken(min)` DESC
            LIMIT 100
        """)

        result = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(result)

    except Exception as error:
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(debug=True)
