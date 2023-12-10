CREATE TABLE Events (
    event_id INT PRIMARY KEY,
    host_uid INT,
    title VARCHAR(255),
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    food_type VARCHAR(255),
    price_type VARCHAR(255),
    num_likes INT DEFAULT 0,
    num_reports INT DEFAULT 0,
    FOREIGN KEY (host_uid) REFERENCES Users(uid),
    CHECK (food_type IN ('Limited Menu', 'Vegan', 'Vegetarian', 'Gluten Free', 'Vegan and Gluten Free', 'Vegetarian and Gluten Free')),
    CHECK (price_type IN ('Free', 'Paid, no food points', 'Paid, food points'))
);
