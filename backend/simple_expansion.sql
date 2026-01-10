-- Simple database expansion - adding just a few more records

-- Add 2 more brands
INSERT INTO brand (brand_id, name, country_of_origin, website, description, established_year) VALUES
(31, 'Sierra Nevada', 'United States', 'www.sierranevada.com', 'Craft beer pioneer from California', 1980),
(32, 'New Belgium', 'United States', 'www.newbelgium.com', 'Colorado-based craft brewery', 1991);

-- Add 2 more beers
INSERT INTO beer (beer_id, name, beer_kind, alcohol_content, price, container_kind, volume_liters, brand_id, description) VALUES
(43, 'Sierra Nevada Pale Ale', 'ale', 5.6, 3.80, 'bottle', 0.36, 31, 'Classic American pale ale'),
(44, 'New Belgium Fat Tire', 'ale', 5.2, 3.50, 'bottle', 0.36, 32, 'Amber ale with Belgian inspiration');

-- Add 2 more customers
INSERT INTO customer (customer_id, registration_date, loyalty_points, email, phone, street, city, postal_code, country, first_name, last_name, birth_date) VALUES
(31, '2024-02-15', 35, 'alex.smith@example.com', '+15551001', 'Oak Street 123', 'Chicago', '60601', 'United States', 'Alex', 'Smith', '1988-03-15'),
(32, '2024-03-20', 45, 'maria.garcia@example.com', '+15551002', 'Main Street 456', 'Los Angeles', '90210', 'United States', 'Maria', 'Garcia', '1992-07-22');

-- Add 1 more order
INSERT INTO orders (order_id, status, customer_id, total_amount, order_date, payment_method) VALUES
(31, 'completed', 31, 7.30, '2024-07-15', 'card');

-- Add order items
INSERT INTO orderhasbeer (order_id, line_number, beer_id, quantity, price_per_unit, line_total) VALUES
(31, 1, 43, 1, 3.80, 3.80),
(31, 2, 44, 1, 3.50, 3.50);

-- Add 1 review
INSERT INTO customerreviewsbeer (beer_id, customer_id, comment, review_date, rating) VALUES
(43, 31, 'Excellent pale ale, very balanced!', '2024-07-15', 4.5);