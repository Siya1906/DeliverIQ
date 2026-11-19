-- 1. Primary key constraints
-- Each table has ID as its primary key.


SHOW KEYS FROM orders WHERE Key_name = 'PRIMARY';
SHOW KEYS FROM locations WHERE Key_name = 'PRIMARY';
SHOW KEYS FROM delivery_records WHERE Key_name = 'PRIMARY';


-- 2. Foreign key constraints
-- locations.ID references orders.ID
-- delivery_records.ID references orders.ID

SELECT
    TABLE_NAME,
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'DeliverIQ'
AND REFERENCED_TABLE_NAME IS NOT NULL;


-- 3. Verify table storage engines

SELECT
    TABLE_NAME,
    ENGINE
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'DeliverIQ';


-- 4. Check duplicate order IDs

SELECT
    ID,
    COUNT(*) AS occurrences
FROM orders
GROUP BY ID
HAVING COUNT(*) > 1;


-- 5. Check NULL primary keys

SELECT COUNT(*) AS null_order_ids
FROM orders
WHERE ID IS NULL;
