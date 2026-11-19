-- Data was imported from three CSV files using import_data.py.

-- 1. Check total records in each table

SELECT 'orders' AS table_name, COUNT(*) AS total_records
FROM orders

UNION ALL

SELECT 'locations', COUNT(*)
FROM locations

UNION ALL

SELECT 'delivery_records', COUNT(*)
FROM delivery_records;


-- 2. Check unique order IDs

SELECT
    COUNT(*) AS total_orders,
    COUNT(DISTINCT ID) AS unique_order_ids
FROM orders;


-- 3. Check whether all orders have matching location records

SELECT COUNT(*) AS missing_location_records
FROM orders o
LEFT JOIN locations l ON o.ID = l.ID
WHERE l.ID IS NULL;


-- 4. Check whether all orders have matching delivery records

SELECT COUNT(*) AS missing_delivery_records
FROM orders o
LEFT JOIN delivery_records d ON o.ID = d.ID
WHERE d.ID IS NULL;
