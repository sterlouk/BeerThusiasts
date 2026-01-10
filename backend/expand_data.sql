-- Additional dummy data to expand the beer database
-- This adds more records to the existing database to make it more comprehensive

-- Add more brands (starting from ID 31)
INSERT INTO brand (brand_id, name, country_of_origin, website, description, established_year) VALUES
(31, 'Sierra Nevada', 'United States', 'www.sierranevada.com', 'Craft beer pioneer from California', 1980),
(12, 'New Belgium', 'United States', 'www.newbelgium.com', 'Colorado-based craft brewery', 1991),
(13, 'Lagunitas', 'United States', 'www.lagunitas.com', 'Independent craft brewery', 1993),
(14, 'Stone Brewing', 'United States', 'www.stonebrewing.com', 'San Diego craft beer institution', 1996),
(15, 'Founders Brewing', 'United States', 'www.foundersbrewing.com', 'Michigan craft brewery', 1997),
(16, 'Bell\'s Brewery', 'United States', 'www.bellsbeer.com', 'Michigan-based craft brewery', 1985),
(17, 'Dogfish Head', 'United States', 'www.dogfish.com', 'Off-centered ales from Delaware', 1995),
(18, 'Great Lakes Brewing', 'United States', 'www.greatlakesbrewing.com', 'Ohio craft brewery', 1988),
(19, 'Anchor Brewing', 'United States', 'www.anchorbrewing.com', 'Historic San Francisco brewery', 1896),
(20, 'Firestone Walker', 'United States', 'www.firestonebeer.com', 'California craft brewery', 1996),
(21, 'BrewDog', 'United Kingdom', 'www.brewdog.com', 'Scottish craft beer revolution', 2007),
(22, 'Fuller\'s', 'United Kingdom', 'www.fullers.co.uk', 'London brewery since 1845', 1845),
(23, 'Samuel Smith', 'United Kingdom', 'www.samuelsmithsbrewery.co.uk', 'Yorkshire brewery', 1758),
(24, 'Timothy Taylor', 'United Kingdom', 'www.timothytaylor.co.uk', 'North Yorkshire brewery', 1858),
(25, 'Theakston', 'United Kingdom', 'www.theakston.co.uk', 'Masham brewery', 1827),
(26, 'Brooklyn Brewery', 'United States', 'www.brooklynbrewery.com', 'New York craft brewery', 1988),
(27, 'Victory Brewing', 'United States', 'www.victorybeer.com', 'Pennsylvania craft brewery', 1996),
(28, 'Flying Dog Brewery', 'United States', 'www.flyingdog.com', 'Maryland craft brewery', 1985),
(29, 'Shiner Bock', 'United States', 'www.shiner.com', 'Texas brewery', 1909),
(30, 'Yuengling', 'United States', 'www.yuengling.com', 'America\'s oldest brewery', 1829);

-- Add more beers (starting from ID 12)
INSERT INTO beer (beer_id, name, beer_kind, alcohol_content, price, container_kind, volume_liters, brand_id, description) VALUES
(43, 'Sierra Nevada Pale Ale', 'ale', 5.6, 3.80, 'bottle', 0.36, 31, 'Classic American pale ale'),
(13, 'New Belgium Fat Tire', 'ale', 5.2, 3.50, 'bottle', 0.36, 12, 'Amber ale with Belgian inspiration'),
(14, 'Lagunitas IPA', 'ipa', 6.2, 4.00, 'bottle', 0.36, 13, 'Bold West Coast IPA'),
(15, 'Stone IPA', 'ipa', 6.9, 4.20, 'bottle', 0.36, 14, 'Intensely hoppy IPA'),
(16, 'Founders Breakfast Stout', 'stout', 8.3, 5.00, 'bottle', 0.36, 15, 'Coffee-infused imperial stout'),
(17, 'Bell\'s Two Hearted Ale', 'ale', 7.0, 4.50, 'bottle', 0.36, 16, 'American IPA with Centennial hops'),
(18, 'Dogfish Head 60 Minute IPA', 'ipa', 6.0, 4.00, 'bottle', 0.36, 17, 'Continuous hopped IPA'),
(19, 'Great Lakes Edmund Fitzgerald', 'porter', 6.0, 4.20, 'bottle', 0.36, 18, 'Baltic-style porter'),
(20, 'Anchor Steam Beer', 'ale', 4.9, 3.60, 'can', 0.36, 19, 'California common beer'),
(21, 'Firestone Walker Mind Haze', 'ipa', 6.2, 4.50, 'can', 0.47, 20, 'Hazy IPA'),
(22, 'BrewDog Punk IPA', 'ipa', 5.6, 3.80, 'can', 0.44, 21, 'Post modern classic IPA'),
(23, 'Fuller\'s London Pride', 'ale', 4.7, 3.90, 'bottle', 0.50, 22, 'Classic English bitter'),
(24, 'Samuel Smith\'s Oatmeal Stout', 'stout', 5.0, 4.20, 'bottle', 0.55, 23, 'Smooth oatmeal stout'),
(25, 'Timothy Taylor Landlord', 'ale', 4.3, 3.70, 'bottle', 0.50, 24, 'Classic pale ale'),
(26, 'Theakston Old Peculier', 'ale', 5.6, 4.10, 'bottle', 0.50, 25, 'Old ale with distinctive taste'),
(27, 'Brooklyn Lager', 'lager', 5.2, 3.40, 'bottle', 0.36, 26, 'American amber lager'),
(28, 'Victory Prima Pils', 'lager', 5.3, 3.60, 'bottle', 0.36, 27, 'German-style pilsner'),
(29, 'Flying Dog Doggie Style', 'ale', 5.5, 3.80, 'bottle', 0.36, 28, 'Classic pale ale'),
(30, 'Shiner Bock', 'lager', 4.4, 3.20, 'bottle', 0.36, 29, 'Dark lager'),
(31, 'Yuengling Traditional Lager', 'lager', 4.4, 3.00, 'bottle', 0.36, 30, 'American lager'),
(32, 'Sierra Nevada Hazy Little Thing', 'ipa', 6.7, 4.30, 'can', 0.47, 11, 'Hazy IPA'),
(33, 'New Belgium Voodoo Ranger', 'ale', 7.0, 4.50, 'bottle', 0.36, 12, 'Imperial IPA'),
(34, 'Lagunitas Little Sumpin\'', 'ale', 7.5, 4.80, 'bottle', 0.36, 13, 'Wheat ale with hops'),
(35, 'Stone Enjoy By IPA', 'ipa', 9.4, 5.50, 'bottle', 0.36, 14, 'Triple IPA'),
(36, 'Founders KBS', 'stout', 12.7, 8.00, 'bottle', 0.36, 15, 'Kentucky Breakfast Stout'),
(37, 'Bell\'s Expedition Stout', 'stout', 10.5, 5.80, 'bottle', 0.36, 16, 'Russian imperial stout'),
(38, 'Dogfish Head 90 Minute IPA', 'ipa', 9.0, 5.20, 'bottle', 0.36, 17, 'Intensely hopped IPA'),
(39, 'Great Lakes Dortmunder Gold', 'lager', 5.8, 3.90, 'bottle', 0.36, 18, 'German-style lager'),
(40, 'Anchor Porter', 'porter', 5.6, 4.00, 'bottle', 0.36, 19, 'Robust porter'),
(41, 'Firestone Walker Parabola', 'stout', 14.0, 9.00, 'bottle', 0.36, 20, 'Russian imperial stout'),
(42, 'BrewDog Tactical Nuclear Penguin', 'stout', 32.0, 15.00, 'bottle', 0.33, 21, 'Tactical nuclear penguin');

-- Add more pubs (starting from ID 11) - expanding to other countries
INSERT INTO pub (pub_id, name, manager_name, phone, street, city, postal_code, country) VALUES
(11, 'The Craft Beer House', 'David Johnson', '+1-415-555-0123', 'Mission Street 123', 'San Francisco', '94103', 'United States'),
(12, 'Brewery Row', 'Sarah Williams', '+1-303-555-0456', 'Larimer Street 567', 'Denver', '80202', 'United States'),
(13, 'The Hop Garden', 'Mike Chen', '+1-206-555-0789', 'Pike Place 890', 'Seattle', '98101', 'United States'),
(14, 'Porter & Stout', 'Lisa Rodriguez', '+1-512-555-0321', '6th Street 456', 'Austin', '78701', 'United States'),
(15, 'The Ale Engine', 'Tom Anderson', '+1-216-555-0654', 'Ohio City 789', 'Cleveland', '44113', 'United States'),
(16, 'Craft Central', 'Emma Davis', '+44205550987', 'Brick Lane 321', 'London', 'E1 6QR', 'United Kingdom'),
(17, 'The Beer Temple', 'James Wilson', '+44-161-555-0432', 'Northern Quarter 654', 'Manchester', 'M4 1LN', 'United Kingdom'),
(18, 'Scottish Ales', 'Fiona MacDonald', '+44-141-555-0765', 'Buchanan Street 987', 'Glasgow', 'G1 2JF', 'United Kingdom'),
(19, 'The Yorkshire Arms', 'Richard Thompson', '+44-1904-555-0213', 'Micklegate 147', 'York', 'YO1 6JG', 'United Kingdom'),
(20, 'Northern Soul', 'Karen Patel', '+44-113-555-0543', 'Call Lane 258', 'Leeds', 'LS1 7BE', 'United Kingdom'),
(21, 'The Dublin Draught', 'Patrick Murphy', '+353-1-555-0876', 'Temple Bar 369', 'Dublin', 'D02 X285', 'Ireland'),
(22, 'Guinness Corner', 'Siobhan Kelly', '+353-21-555-0312', 'Patrick Street 741', 'Cork', 'T12 X8F2', 'Ireland'),
(23, 'The Berlin Biergarten', 'Hans Mueller', '+49-30-555-0645', 'Unter den Linden 852', 'Berlin', '10117', 'Germany'),
(24, 'Munich Hofbräuhaus', 'Franz Bauer', '+49-89-555-0978', 'Platzl 9', 'Munich', '80331', 'Germany'),
(25, 'Vienna Brew House', 'Karl Wagner', '+43-1-555-0234', 'Stephansplatz 456', 'Vienna', '1010', 'Austria'),
(26, 'Prague Beer Museum', 'Jan Novak', '+420-2-555-0567', 'Karlova 789', 'Prague', '110 00', 'Czech Republic'),
(27, 'Amsterdam Brewpub', 'Pieter Jansen', '+31-20-555-0890', 'Dam Square 123', 'Amsterdam', '1012 JL', 'Netherlands'),
(28, 'Brussels Grand Place', 'Marie Dubois', '+32-2-555-0123', 'Grand Place 456', 'Brussels', '1000', 'Belgium'),
(29, 'Copenhagen Craft', 'Lars Hansen', '+45-33-555-0456', 'Stroget 789', 'Copenhagen', '1000', 'Denmark'),
(30, 'Stockholm Brew House', 'Erik Johansson', '+46-8-555-0789', 'Gamla Stan 321', 'Stockholm', '111 28', 'Sweden');

-- Add more employees (starting from ID 11)
INSERT INTO employee (employee_id, hire_date, salary, email, shift, position, phone, first_name, last_name, pub_id) VALUES
(11, '2023-02-15', 3200.00, 'david.johnson@craftbeerhouse.us', 'morning', 'manager', '+1-415-555-0123', 'David', 'Johnson', 11),
(12, '2023-04-20', 2400.00, 'sarah.williams@breweryrow.us', 'evening', 'bartender', '+1-303-555-0456', 'Sarah', 'Williams', 12),
(13, '2023-06-10', 2200.00, 'mike.chen@hopgarden.us', 'night', 'bartender', '+1-206-555-0789', 'Mike', 'Chen', 13),
(14, '2023-08-05', 2100.00, 'lisa.rodriguez@porterstout.us', 'morning', 'waiter', '+1-512-555-0321', 'Lisa', 'Rodriguez', 14),
(15, '2023-09-12', 2300.00, 'tom.anderson@aleengine.us', 'evening', 'bartender', '+1-216-555-0654', 'Tom', 'Anderson', 15),
(16, '2023-03-18', 2800.00, 'emma.davis@craftcentral.uk', 'morning', 'manager', '+44-20-5555-0987', 'Emma', 'Davis', 16),
(17, '2023-05-25', 2500.00, 'james.wilson@beertemple.uk', 'evening', 'bartender', '+44-161-555-0432', 'James', 'Wilson', 17),
(18, '2023-07-08', 2400.00, 'fiona.macdonald@scottishales.uk', 'night', 'bartender', '+44-141-555-0765', 'Fiona', 'MacDonald', 18),
(19, '2023-10-14', 2600.00, 'richard.thompson@yorkshirearms.uk', 'morning', 'manager', '+44-1904-555-0213', 'Richard', 'Thompson', 19),
(20, '2023-11-20', 2200.00, 'karen.patel@northernsoul.uk', 'evening', 'waiter', '+44-113-555-0543', 'Karen', 'Patel', 20),
(21, '2023-01-30', 2700.00, 'patrick.murphy@dublindraught.ie', 'morning', 'manager', '+353-1-555-0876', 'Patrick', 'Murphy', 21),
(22, '2023-04-05', 2300.00, 'siobhan.kelly@guinnesscorner.ie', 'evening', 'bartender', '+353-21-555-0312', 'Siobhan', 'Kelly', 22),
(23, '2023-06-22', 2900.00, 'hans.mueller@berlinbiergarten.de', 'morning', 'manager', '+49-30-555-0645', 'Hans', 'Mueller', 23),
(24, '2023-08-18', 2500.00, 'franz.bauer@munichhofbrauhaus.de', 'evening', 'bartender', '+49-89-555-0978', 'Franz', 'Bauer', 24),
(25, '2023-09-30', 2400.00, 'karl.wagner@viennabrewhouse.at', 'night', 'bartender', '+43-1-555-0234', 'Karl', 'Wagner', 25),
(26, '2023-02-28', 2600.00, 'jan.novak@praguebeermuseum.cz', 'morning', 'manager', '+420-2-555-0567', 'Jan', 'Novak', 26),
(27, '2023-05-15', 2300.00, 'pieter.jansen@amsterdambrewpub.nl', 'evening', 'bartender', '+31-20-555-0890', 'Pieter', 'Jansen', 27),
(28, '2023-07-20', 2500.00, 'marie.dubois@brusselsgrandplace.be', 'morning', 'manager', '+32-2-555-0123', 'Marie', 'Dubois', 28),
(29, '2023-10-08', 2400.00, 'lars.hansen@copenhagencraft.dk', 'evening', 'bartender', '+45-33-555-0456', 'Lars', 'Hansen', 29),
(30, '2023-12-01', 2600.00, 'erik.johansson@stockholmbrewhouse.se', 'morning', 'manager', '+46-8-555-0789', 'Erik', 'Johansson', 30);

-- Add more customers (starting from ID 11)
INSERT INTO customer (customer_id, registration_date, loyalty_points, email, phone, street, city, postal_code, country, first_name, last_name, birth_date) VALUES
(11, '2024-02-15', 35, 'alex.smith@example.com', '+1-555-1001', 'Oak Street 123', 'Chicago', '60601', 'United States', 'Alex', 'Smith', '1988-03-15'),
(12, '2024-03-20', 45, 'maria.garcia@example.com', '+1-555-1002', 'Main Street 456', 'Los Angeles', '90210', 'United States', 'Maria', 'Garcia', '1992-07-22'),
(13, '2024-04-10', 25, 'james.brown@example.com', '+1-555-1003', 'Elm Avenue 789', 'Boston', '02101', 'United States', 'James', 'Brown', '1985-11-08'),
(14, '2024-05-05', 55, 'linda.johnson@example.com', '+1-555-1004', 'Pine Road 321', 'Miami', '33101', 'United States', 'Linda', 'Johnson', '1990-01-30'),
(15, '2024-06-12', 30, 'robert.williams@example.com', '+1-555-1005', 'Cedar Lane 654', 'Seattle', '98101', 'United States', 'Robert', 'Williams', '1987-09-14'),
(16, '2024-07-18', 40, 'patricia.jones@example.com', '+44-20-555-1006', 'Baker Street 987', 'London', 'W1U 6TJ', 'United Kingdom', 'Patricia', 'Jones', '1991-05-25'),
(17, '2024-08-22', 50, 'michael.davis@example.com', '+44-161-555-1007', 'Deansgate 147', 'Manchester', 'M3 3DE', 'United Kingdom', 'Michael', 'Davis', '1986-12-03'),
(18, '2024-09-14', 20, 'barbara.miller@example.com', '+44-141-555-1008', 'Sauchiehall Street 258', 'Glasgow', 'G2 3EX', 'United Kingdom', 'Barbara', 'Miller', '1993-08-19'),
(19, '2024-10-08', 65, 'william.wilson@example.com', '+44-113-555-1009', 'Briggate 369', 'Leeds', 'LS1 4DY', 'United Kingdom', 'William', 'Wilson', '1984-04-11'),
(20, '2024-11-25', 15, 'elizabeth.moore@example.com', '+44-1904-555-1010', 'Petergate 741', 'York', 'YO1 7HP', 'United Kingdom', 'Elizabeth', 'Moore', '1995-06-28'),
(21, '2024-12-01', 70, 'daniel.taylor@example.com', '+353-1-555-1011', 'Grafton Street 852', 'Dublin', 'D02 N284', 'Ireland', 'Daniel', 'Taylor', '1983-02-17'),
(22, '2024-12-15', 28, 'jennifer.anderson@example.com', '+353-21-555-1012', 'Oliver Plunkett Street 963', 'Cork', 'T12 K7C8', 'Ireland', 'Jennifer', 'Anderson', '1994-10-09'),
(23, '2025-01-10', 42, 'thomas.thomas@example.com', '+49-30-555-1013', 'Friedrichstrasse 147', 'Berlin', '10117', 'Germany', 'Thomas', 'Thomas', '1989-07-05'),
(24, '2025-02-05', 38, 'susan.jackson@example.com', '+49-89-555-1014', 'Maximilianstrasse 258', 'Munich', '80539', 'Germany', 'Susan', 'Jackson', '1992-03-21'),
(25, '2025-03-12', 52, 'joseph.white@example.com', '+43-1-555-1015', 'Kärntner Strasse 369', 'Vienna', '1010', 'Austria', 'Joseph', 'White', '1987-11-13'),
(26, '2025-04-18', 33, 'margaret.harris@example.com', '+420-2-555-1016', 'Národní třída 741', 'Prague', '110 00', 'Czech Republic', 'Margaret', 'Harris', '1990-08-27'),
(27, '2025-05-22', 47, 'charles.martin@example.com', '+31-20-555-1017', 'Kalverstraat 852', 'Amsterdam', '1012 XK', 'Netherlands', 'Charles', 'Martin', '1985-12-04'),
(28, '2025-06-08', 29, 'dorothy.thompson@example.com', '+32-2-555-1018', 'Rue Neuve 963', 'Brussels', '1000', 'Belgium', 'Dorothy', 'Thompson', '1993-05-16'),
(29, '2025-07-15', 61, 'christopher.garcia@example.com', '+45-33-555-1019', 'Strøget 147', 'Copenhagen', '1000', 'Denmark', 'Christopher', 'Garcia', '1982-01-08'),
(30, '2025-08-20', 24, 'anna.martinez@example.com', '+46-8-555-1020', 'Drottninggatan 258', 'Stockholm', '111 51', 'Sweden', 'Anna', 'Martinez', '1996-09-30');

-- Add more customer reviews (starting from existing beers and new customers)
INSERT INTO customerreviewsbeer (beer_id, customer_id, comment, review_date, rating) VALUES
(12, 11, 'Excellent pale ale, very balanced!', '2024-07-15', 4.5),
(13, 12, 'Fat Tire is always a great choice', '2024-07-16', 4.0),
(14, 13, 'Too hoppy for my taste', '2024-07-17', 3.0),
(15, 14, 'Stone IPA delivers as expected', '2024-07-18', 4.5),
(16, 15, 'Amazing breakfast stout, coffee notes are perfect', '2024-07-19', 5.0),
(17, 16, 'Two Hearted is a classic IPA', '2024-07-20', 4.2),
(18, 17, '60 Minute lives up to its name - very hoppy!', '2024-07-21', 4.0),
(19, 18, 'Edmund Fitzgerald is a winter favorite', '2024-07-22', 4.8),
(20, 19, 'Anchor Steam has that unique California taste', '2024-07-23', 4.0),
(21, 20, 'Mind Haze is perfectly hazy and delicious', '2024-07-24', 4.5),
(22, 21, 'Punk IPA is consistently good', '2024-07-25', 4.0),
(23, 22, 'London Pride is a proper English ale', '2024-07-26', 4.2),
(24, 23, 'Oatmeal stout is so smooth and creamy', '2024-07-27', 4.8),
(25, 24, 'Landlord is a classic pale ale', '2024-07-28', 4.0),
(26, 25, 'Old Peculier has such a distinctive flavor', '2024-07-29', 4.5),
(27, 26, 'Brooklyn Lager is very drinkable', '2024-07-30', 3.8),
(28, 27, 'Prima Pils is crisp and refreshing', '2024-07-31', 4.0),
(29, 28, 'Doggie Style is a solid pale ale', '2024-08-01', 4.0),
(30, 29, 'Shiner Bock is a Texas classic', '2024-08-02', 4.2),
(31, 30, 'Yuengling is America\'s oldest for a reason', '2024-08-03', 4.0);

-- Add more orders (starting from ID 31)
INSERT INTO orders (order_id, status, customer_id, total_amount, order_date, payment_method) VALUES
(31, 'completed', 11, 18.50, '2024-07-15', 'card'),
(32, 'completed', 12, 14.20, '2024-07-16', 'cash'),
(33, 'pending', 13, 22.80, '2024-07-17', 'card'),
(34, 'completed', 14, 27.50, '2024-07-18', 'card'),
(35, 'completed', 15, 31.20, '2024-07-19', 'cash'),
(36, 'completed', 16, 19.80, '2024-07-20', 'card'),
(37, 'pending', 17, 25.90, '2024-07-21', 'cash'),
(38, 'completed', 18, 16.40, '2024-07-22', 'card'),
(39, 'completed', 19, 33.60, '2024-07-23', 'card'),
(40, 'completed', 20, 21.30, '2024-07-24', 'cash'),
(41, 'completed', 21, 28.70, '2024-07-25', 'card'),
(42, 'pending', 22, 24.50, '2024-07-26', 'cash'),
(43, 'completed', 23, 35.80, '2024-07-27', 'card'),
(44, 'completed', 24, 17.90, '2024-07-28', 'card'),
(45, 'completed', 25, 29.40, '2024-07-29', 'cash'),
(46, 'completed', 26, 23.60, '2024-07-30', 'card'),
(47, 'pending', 27, 26.80, '2024-07-31', 'cash'),
(48, 'completed', 28, 20.10, '2024-08-01', 'card'),
(49, 'completed', 29, 32.90, '2024-08-02', 'card'),
(50, 'completed', 30, 18.70, '2024-08-03', 'cash');

-- Add order items for the new orders
INSERT INTO orderhasbeer (order_id, line_number, beer_id, quantity, price_per_unit, line_total) VALUES
-- Order 31
(31, 1, 12, 2, 3.80, 7.60),
(31, 2, 14, 1, 4.00, 4.00),
(31, 3, 16, 1, 5.00, 5.00),
(31, 4, 20, 1, 3.60, 3.60),
(31, 5, 27, 1, 3.40, 3.40),

-- Order 32
(32, 1, 13, 2, 3.50, 7.00),
(32, 2, 17, 1, 4.50, 4.50),
(32, 3, 23, 1, 3.90, 3.90),
(32, 4, 29, 1, 3.80, 3.80),

-- Order 33
(33, 1, 15, 1, 4.20, 4.20),
(33, 2, 18, 2, 4.00, 8.00),
(33, 3, 21, 1, 4.50, 4.50),
(33, 4, 25, 1, 3.70, 3.70),
(33, 5, 31, 2, 3.00, 6.00),

-- Order 34
(34, 1, 16, 1, 5.00, 5.00),
(34, 2, 19, 1, 4.20, 4.20),
(34, 3, 22, 2, 3.80, 7.60),
(34, 4, 26, 1, 4.10, 4.10),
(34, 5, 30, 2, 3.20, 6.40),

-- Order 35
(35, 1, 17, 1, 4.50, 4.50),
(35, 2, 20, 2, 3.60, 7.20),
(35, 3, 24, 1, 4.20, 4.20),
(35, 4, 28, 2, 3.60, 7.20),
(35, 5, 32, 1, 4.30, 4.30),

-- Order 36
(36, 1, 12, 1, 3.80, 3.80),
(36, 2, 18, 1, 4.00, 4.00),
(36, 3, 23, 2, 3.90, 7.80),
(36, 4, 27, 1, 3.40, 3.40),

-- Order 37
(37, 1, 14, 2, 4.00, 8.00),
(37, 2, 19, 1, 4.20, 4.20),
(37, 3, 25, 2, 3.70, 7.40),
(37, 4, 29, 1, 3.80, 3.80),

-- Order 38
(38, 1, 15, 1, 4.20, 4.20),
(38, 2, 21, 1, 4.50, 4.50),
(38, 3, 26, 1, 4.10, 4.10),
(38, 4, 31, 2, 3.00, 6.00),

-- Order 39
(39, 1, 16, 1, 5.00, 5.00),
(39, 2, 22, 2, 3.80, 7.60),
(39, 3, 28, 1, 3.60, 3.60),
(39, 4, 33, 1, 4.50, 4.50),
(39, 5, 37, 1, 5.80, 5.80),

-- Order 40
(40, 1, 17, 1, 4.50, 4.50),
(40, 2, 24, 1, 4.20, 4.20),
(40, 3, 30, 2, 3.20, 6.40),
(40, 4, 34, 1, 4.80, 4.80);

-- Add more inventory data for the new pubs and beers
INSERT INTO pubhasbeer (pub_id, beer_id, quantity_available, last_updated, reorder_threshold, storage_location) VALUES
-- New US pubs inventory
(11, 12, 45.00, '2024-07-01', 20.00, 'Main Cooler'),
(11, 14, 35.00, '2024-07-01', 15.00, 'IPA Section'),
(11, 16, 25.00, '2024-07-01', 10.00, 'Stout Fridge'),
(11, 20, 40.00, '2024-07-01', 18.00, 'Main Cooler'),
(11, 27, 50.00, '2024-07-01', 22.00, 'Lager Area'),

(12, 13, 38.00, '2024-07-02', 16.00, 'Amber Ale Cooler'),
(12, 17, 28.00, '2024-07-02', 12.00, 'IPA Fridge'),
(12, 21, 32.00, '2024-07-02', 14.00, 'Hazy Section'),
(12, 29, 42.00, '2024-07-02', 19.00, 'Pale Ale Area'),

(13, 14, 48.00, '2024-07-03', 20.00, 'West Coast IPA'),
(13, 18, 30.00, '2024-07-03', 13.00, 'Continuous Hop'),
(13, 22, 35.00, '2024-07-03', 15.00, 'Craft IPA'),
(13, 32, 25.00, '2024-07-03', 11.00, 'Hazy IPA'),

(14, 15, 40.00, '2024-07-04', 18.00, 'Stone Section'),
(14, 19, 33.00, '2024-07-04', 15.00, 'Porter Area'),
(14, 30, 45.00, '2024-07-04', 20.00, 'Texas Lager'),
(14, 34, 28.00, '2024-07-04', 12.00, 'Wheat Ale'),

(15, 16, 35.00, '2024-07-05', 15.00, 'Imperial Stout'),
(15, 20, 42.00, '2024-07-05', 19.00, 'Steam Beer'),
(15, 24, 30.00, '2024-07-05', 13.00, 'Oatmeal Stout'),
(15, 28, 38.00, '2024-07-05', 17.00, 'Pilsner Area'),

-- New UK pubs inventory
(16, 22, 55.00, '2024-07-06', 25.00, 'Scottish IPA'),
(16, 23, 48.00, '2024-07-06', 22.00, 'London Bitter'),
(16, 25, 35.00, '2024-07-06', 15.00, 'Yorkshire Ale'),
(16, 27, 42.00, '2024-07-06', 19.00, 'American Lager'),

(17, 17, 40.00, '2024-07-07', 18.00, 'Michigan IPA'),
(17, 22, 45.00, '2024-07-07', 20.00, 'Punk IPA'),
(17, 26, 32.00, '2024-07-07', 14.00, 'Old Ale'),
(17, 29, 38.00, '2024-07-07', 17.00, 'Classic Pale'),

(18, 4, 50.00, '2024-07-08', 22.00, 'Irish Lager'),
(18, 23, 42.00, '2024-07-08', 19.00, 'London Pride'),
(18, 24, 35.00, '2024-07-08', 15.00, 'Yorkshire Stout'),
(18, 27, 48.00, '2024-07-08', 21.00, 'Brooklyn Lager'),

(19, 23, 52.00, '2024-07-09', 24.00, 'Fuller\'s Pride'),
(19, 24, 40.00, '2024-07-09', 18.00, 'Samuel Smith'),
(19, 25, 38.00, '2024-07-09', 16.00, 'Timothy Taylor'),
(19, 26, 45.00, '2024-07-09', 20.00, 'Theakston Ale'),

(20, 22, 48.00, '2024-07-10', 21.00, 'BrewDog IPA'),
(20, 25, 42.00, '2024-07-10', 19.00, 'Landlord'),
(20, 27, 35.00, '2024-07-10', 15.00, 'Prima Pils'),
(20, 29, 40.00, '2024-07-10', 18.00, 'Doggie Style'),

-- European pubs inventory
(21, 1, 60.00, '2024-07-11', 28.00, 'Irish Stout'),
(21, 4, 55.00, '2024-07-11', 25.00, 'Heineken'),
(21, 13, 42.00, '2024-07-11', 19.00, 'Fat Tire'),
(21, 23, 48.00, '2024-07-11', 22.00, 'London Pride'),

(22, 2, 45.00, '2024-07-12', 20.00, 'Murphy\'s Red'),
(22, 4, 50.00, '2024-07-12', 23.00, 'Heineken'),
(22, 9, 40.00, '2024-07-12', 18.00, 'Stella Artois'),
(22, 25, 35.00, '2024-07-12', 15.00, 'Landlord'),

(23, 7, 55.00, '2024-07-13', 25.00, 'Corona Extra'),
(23, 17, 42.00, '2024-07-13', 19.00, 'Two Hearted'),
(23, 31, 48.00, '2024-07-13', 22.00, 'Yuengling'),
(23, 39, 35.00, '2024-07-13', 15.00, 'Dortmunder Gold'),

(24, 7, 58.00, '2024-07-14', 26.00, 'Corona'),
(24, 18, 45.00, '2024-07-14', 20.00, '90 Minute IPA'),
(24, 31, 52.00, '2024-07-14', 24.00, 'Traditional Lager'),
(24, 40, 38.00, '2024-07-14', 17.00, 'Anchor Porter'),

(25, 8, 50.00, '2024-07-15', 23.00, 'Carlsberg'),
(25, 19, 42.00, '2024-07-15', 19.00, 'Edmund Fitzgerald'),
(25, 32, 35.00, '2024-07-15', 15.00, 'Hazy Little Thing'),
(25, 39, 48.00, '2024-07-15', 22.00, 'Dortmunder Gold'),

(26, 10, 55.00, '2024-07-16', 25.00, 'Pilsner Urquell'),
(26, 24, 45.00, '2024-07-16', 20.00, 'Oatmeal Stout'),
(26, 33, 38.00, '2024-07-16', 17.00, 'Voodoo Ranger'),
(26, 40, 42.00, '2024-07-16', 19.00, 'Anchor Porter'),

(27, 4, 60.00, '2024-07-17', 28.00, 'Heineken'),
(27, 12, 48.00, '2024-07-17', 22.00, 'Sierra Nevada Pale'),
(27, 21, 42.00, '2024-07-17', 19.00, 'Mind Haze'),
(27, 34, 35.00, '2024-07-17', 15.00, 'Little Sumpin\''),

(28, 5, 52.00, '2024-07-18', 24.00, 'Mythos'),
(28, 13, 45.00, '2024-07-18', 20.00, 'Fat Tire'),
(28, 25, 40.00, '2024-07-18', 18.00, 'Landlord'),
(28, 35, 32.00, '2024-07-18', 14.00, 'Enjoy By IPA'),

(29, 6, 48.00, '2024-07-19', 22.00, 'Fix Hellas'),
(29, 15, 42.00, '2024-07-19', 19.00, 'Stone IPA'),
(29, 26, 38.00, '2024-07-19', 17.00, 'Old Peculier'),
(29, 36, 28.00, '2024-07-19', 12.00, 'Kentucky Breakfast Stout'),

(30, 8, 55.00, '2024-07-20', 25.00, 'Carlsberg'),
(30, 16, 45.00, '2024-07-20', 20.00, 'Breakfast Stout'),
(30, 27, 42.00, '2024-07-20', 19.00, 'Brooklyn Lager'),
(30, 37, 35.00, '2024-07-20', 15.00, 'Expedition Stout');

-- Add some supplier-brand relationships for the new brands
INSERT INTO brandsuppliedbysupplier (supplier_id, brand_id, supply_price) VALUES
(1, 11, 2.80),  -- Irish Beverages supplies Sierra Nevada
(1, 16, 3.20),  -- Irish Beverages supplies Bell's
(2, 11, 2.85),  -- American Beer Imports supplies Sierra Nevada
(2, 12, 2.90),  -- American Beer Imports supplies New Belgium
(2, 13, 3.10),  -- American Beer Imports supplies Lagunitas
(2, 14, 3.30),  -- American Beer Imports supplies Stone
(2, 15, 3.80),  -- American Beer Imports supplies Founders
(2, 16, 3.40),  -- American Beer Imports supplies Bell's
(2, 17, 3.20),  -- American Beer Imports supplies Dogfish Head
(2, 18, 3.50),  -- American Beer Imports supplies Great Lakes
(2, 19, 3.00),  -- American Beer Imports supplies Anchor
(2, 20, 3.60),  -- American Beer Imports supplies Firestone Walker
(2, 26, 2.90),  -- American Beer Imports supplies Brooklyn
(2, 27, 3.10),  -- American Beer Imports supplies Victory
(2, 28, 3.00),  -- American Beer Imports supplies Flying Dog
(2, 29, 2.70),  -- American Beer Imports supplies Shiner
(2, 30, 2.60),  -- American Beer Imports supplies Yuengling
(9, 21, 3.00),  -- UK Beer Distribution supplies BrewDog
(9, 22, 2.90),  -- UK Beer Distribution supplies Fuller's
(9, 23, 3.10),  -- UK Beer Distribution supplies Samuel Smith
(9, 24, 2.80),  -- UK Beer Distribution supplies Timothy Taylor
(9, 25, 3.20),  -- UK Beer Distribution supplies Theakston
(9, 26, 2.85),  -- UK Beer Distribution supplies Brooklyn
(9, 27, 3.05),  -- UK Beer Distribution supplies Victory
(9, 28, 2.95),  -- UK Beer Distribution supplies Flying Dog
(10, 18, 3.45), -- German Beer GmbH supplies Great Lakes
(10, 19, 2.95), -- German Beer GmbH supplies Anchor
(10, 31, 2.75), -- German Beer GmbH supplies Paulaner
(10, 32, 2.85), -- German Beer GmbH supplies Franziskaner
(10, 33, 3.20); -- German Beer GmbH supplies Weihenstephan