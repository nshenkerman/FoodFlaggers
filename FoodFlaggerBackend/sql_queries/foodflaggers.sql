-- Database: FoodFlaggers

-- DROP DATABASE IF EXISTS "FoodFlaggers";

CREATE DATABASE "FoodFlaggers"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
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

CREATE TABLE Preferences (
    uid INT,
    food_preference VARCHAR(255),
    price_preference VARCHAR(255),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);

CREATE TABLE Users (
    uid INT PRIMARY KEY,
    netid VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL
);

