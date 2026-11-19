CREATE DATABASE DeliverIQ;
USE DeliverIQ;

SELECT DATABASE();

USE DeliverIQ;

-- Table 1: Orders
CREATE TABLE orders (
    ID VARCHAR(20) PRIMARY KEY,
    Order_Date VARCHAR(30),
    Time_Orderd VARCHAR(30),
    Time_Order_picked VARCHAR(30),
    Weatherconditions VARCHAR(50),
    Road_traffic_density VARCHAR(50),
    Vehicle_condition INT,
    Type_of_order VARCHAR(50),
    Type_of_vehicle VARCHAR(50),
    multiple_deliveries INT,
    Festival VARCHAR(20),
    City VARCHAR(50),
    `Time_taken(min)` INT
);

-- Table 2: Locations
CREATE TABLE locations (
    ID VARCHAR(20) PRIMARY KEY,
    Restaurant_latitude DECIMAL(10,6),
    Restaurant_longitude DECIMAL(10,6),
    Delivery_location_latitude DECIMAL(10,6),
    Delivery_location_longitude DECIMAL(10,6),

    CONSTRAINT fk_location_order
    FOREIGN KEY (ID) REFERENCES orders(ID)
);

-- Table 3: Delivery Records
CREATE TABLE delivery_records (
    ID VARCHAR(20) PRIMARY KEY,
    Delivery_person_ID VARCHAR(50),
    Delivery_person_Age DECIMAL(5,2),
    Delivery_person_Ratings DECIMAL(3,2),

    CONSTRAINT fk_delivery_order
    FOREIGN KEY (ID) REFERENCES orders(ID)
);

-- Verify tables
SHOW TABLES;