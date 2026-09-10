-- ============================================================
-- Expense Tracker Seed Data (25 sample records)
-- ============================================================

USE expense_tracker;

INSERT INTO expenses (title, amount, category, expense_date, payment_method, description) VALUES
-- September 2026
('Grocery Shopping',        2850.00, 'Food',          '2026-09-09', 'UPI',          'Weekly groceries from BigBasket'),
('Electricity Bill',        1200.00, 'Bills',          '2026-09-08', 'Net Banking',  'Monthly electricity bill'),
('Uber Ride to Office',      350.00, 'Transport',     '2026-09-07', 'Credit Card',  'Weekend office commute'),
('Netflix Subscription',     649.00, 'Entertainment', '2026-09-05', 'Credit Card',  'Monthly Netflix plan'),
('Python Course - Udemy',   1499.00, 'Education',     '2026-09-03', 'Debit Card',   'Machine Learning course'),
('Pharmacy - Vitamins',      680.00, 'Healthcare',    '2026-09-02', 'Cash',         'Multi-vitamin supplements'),
('Amazon Shopping',         3200.00, 'Shopping',      '2026-09-01', 'Credit Card',  'Phone case and accessories'),

-- August 2026
('Restaurant Dinner',       1800.00, 'Food',          '2026-08-28', 'Credit Card',  'Birthday dinner with friends'),
('Metro Monthly Pass',       950.00, 'Transport',     '2026-08-25', 'UPI',          'Monthly metro card recharge'),
('Internet Bill',            799.00, 'Bills',          '2026-08-22', 'Net Banking',  'Broadband monthly bill'),
('Flight to Goa',           6500.00, 'Travel',        '2026-08-18', 'Credit Card',  'Return ticket Bangalore-Goa'),
('Hotel Stay',              4200.00, 'Travel',        '2026-08-18', 'Credit Card',  '2 nights hotel in Goa'),
('Clothes - Myntra',        2100.00, 'Shopping',      '2026-08-15', 'Debit Card',   'Sale shopping - shirts and jeans'),
('Doctor Consultation',      800.00, 'Healthcare',    '2026-08-10', 'Cash',         'General physician visit'),
('Spotify Premium',          119.00, 'Entertainment', '2026-08-05', 'Credit Card',  'Monthly music subscription'),
('Swiggy Orders',           1450.00, 'Food',          '2026-08-03', 'UPI',          'Multiple food deliveries'),

-- July 2026
('Zomato Order',             750.00, 'Food',          '2026-07-30', 'UPI',          'Lunch delivery'),
('Petrol Fill-up',          2500.00, 'Transport',     '2026-07-25', 'Cash',         'Bike fuel'),
('Books - Amazon',           890.00, 'Education',     '2026-07-20', 'Debit Card',   'Programming books'),
('Mobile Recharge',          299.00, 'Bills',          '2026-07-15', 'UPI',          'Monthly prepaid recharge'),
('Gym Membership',          1500.00, 'Healthcare',    '2026-07-10', 'Cash',         'Monthly gym fee'),

-- June 2026
('Movie Tickets',            700.00, 'Entertainment', '2026-06-28', 'Credit Card',  'Weekend movie outing'),
('Long Weekend Trip',        8500.00, 'Travel',       '2026-06-15', 'Credit Card',  'Ooty trip - hotel + food'),
('Groceries - D-Mart',      3100.00, 'Food',          '2026-06-10', 'Debit Card',   'Monthly grocery run'),
('Laptop Bag',              1299.00, 'Shopping',      '2026-06-05', 'UPI',          'New laptop bag from Decathlon');
