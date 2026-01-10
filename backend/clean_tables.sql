-- Script to clean all tables before inserting new dummy data
-- Select the database
USE beerthusiasts;

-- Disable foreign key checks to allow truncation

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE customerreviewsbeer;
TRUNCATE TABLE orderhasbeer;
TRUNCATE TABLE orders;
TRUNCATE TABLE pubhasbeer;
TRUNCATE TABLE employee;
TRUNCATE TABLE supplierorder;
TRUNCATE TABLE brandsuppliedbysupplier;
TRUNCATE TABLE beer;
TRUNCATE TABLE brand;
TRUNCATE TABLE supplier;
TRUNCATE TABLE customer;
TRUNCATE TABLE pub;

SET FOREIGN_KEY_CHECKS = 1;