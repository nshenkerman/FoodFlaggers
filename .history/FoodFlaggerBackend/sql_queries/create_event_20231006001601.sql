CREATE TABLE Event (
    event_id INT PRIMARY KEY,
    host_uid INT,
    title VARCHAR(255),
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    food_type VARCHAR(255),
    price_type VARCHAR(255),
    num_upvotes INT DEFAULT 0,
    num_downvotes INT DEFAULT 0,
    FOREIGN KEY (host_uid) REFERENCES Users(uid)
);
