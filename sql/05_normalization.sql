-- FIRST NORMAL FORM (1NF)
-- 1. Each table contains a primary key.
-- 2. Each column stores atomic (single) values.
-- 3. No repeating groups or multiple values
--    are stored in a single column.

-- SECOND NORMAL FORM (2NF)
-- 1. The tables use single-column primary keys (ID).
-- 2. Therefore, there can be no partial dependency
--    on a composite primary key.

-- THIRD NORMAL FORM (3NF)
-- 1. Order, location and delivery-record information
--    are maintained in separate tables.
-- 2. Location and delivery-record tables reference
--    the orders table through foreign keys.
-- 3. This separation reduces unnecessary duplication
--    and improves data organization.

-- VERIFY TABLE STRUCTURE

DESCRIBE orders;
DESCRIBE locations;
DESCRIBE delivery_records;

-- VERIFY PRIMARY AND FOREIGN KEY RELATIONSHIPS

SELECT
    TABLE_NAME,
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'DeliverIQ';
