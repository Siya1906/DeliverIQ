
USE DeliverIQ;

-- 1. Combine orders, locations and delivery records

SELECT
    o.ID,
    o.City,
    o.Weatherconditions,
    o.Road_traffic_density,
    o.`Time_taken(min)` AS delivery_time,
    d.Delivery_person_ID,
    d.Delivery_person_Age,
    d.Delivery_person_Ratings,
    l.Restaurant_latitude,
    l.Restaurant_longitude,
    l.Delivery_location_latitude,
    l.Delivery_location_longitude

FROM orders o

INNER JOIN locations l
    ON o.ID = l.ID

INNER JOIN delivery_records d
    ON o.ID = d.ID

LIMIT 20;


-- 2. LEFT JOIN: Retrieve all orders and their location details

SELECT
    o.ID,
    o.City,
    o.`Time_taken(min)` AS delivery_time,
    l.Restaurant_latitude,
    l.Restaurant_longitude,
    l.Delivery_location_latitude,
    l.Delivery_location_longitude

FROM orders o

LEFT JOIN locations l
    ON o.ID = l.ID

LIMIT 20;


-- 3. RIGHT JOIN: Retrieve all delivery records and matching order details

SELECT
    d.ID,
    d.Delivery_person_ID,
    d.Delivery_person_Age,
    d.Delivery_person_Ratings,
    o.City,
    o.`Time_taken(min)` AS delivery_time

FROM orders o

RIGHT JOIN delivery_records d
    ON o.ID = d.ID

LIMIT 20;



-- 4. Average delivery time based on weather conditions

SELECT
    o.Weatherconditions,
    COUNT(o.ID) AS total_orders,
    ROUND(AVG(o.`Time_taken(min)`), 2) AS average_delivery_time

FROM orders o

INNER JOIN delivery_records d
    ON o.ID = d.ID

GROUP BY o.Weatherconditions

ORDER BY average_delivery_time DESC;



-- 5. Find delivery personnel with average delivery time above 30 minutes

SELECT
    d.Delivery_person_ID,
    COUNT(o.ID) AS total_deliveries,
    ROUND(AVG(o.`Time_taken(min)`), 2) AS avg_delivery_time

FROM orders o

INNER JOIN delivery_records d
    ON o.ID = d.ID

GROUP BY d.Delivery_person_ID

HAVING AVG(o.`Time_taken(min)`) > 30

ORDER BY avg_delivery_time DESC;



-- 6. Identify delayed orders using all three tables

SELECT
    o.ID,
    o.City,
    o.Weatherconditions,
    o.Road_traffic_density,
    o.`Time_taken(min)` AS delivery_time,
    d.Delivery_person_ID,
    d.Delivery_person_Ratings,
    l.Restaurant_latitude,
    l.Restaurant_longitude,
    l.Delivery_location_latitude,
    l.Delivery_location_longitude

FROM orders o

INNER JOIN delivery_records d
    ON o.ID = d.ID

INNER JOIN locations l
    ON o.ID = l.ID

WHERE o.`Time_taken(min)` > 40

ORDER BY o.`Time_taken(min)` DESC

LIMIT 20;
