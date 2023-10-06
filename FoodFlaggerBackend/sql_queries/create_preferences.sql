CREATE TABLE Preferences (
    uid INT,
    food_preference VARCHAR(255),
    price_preference VARCHAR(255),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);
