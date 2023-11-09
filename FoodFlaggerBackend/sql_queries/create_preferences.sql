CREATE TABLE Preferences (
    uid INT,
    food_preference VARCHAR(255),
    price_preference VARCHAR(255),
    notif_preference VARCHAR(255),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES Users(uid),
    CHECK (food_preference IN ('No Preference', 'Vegan', 'Vegetarian', 'Gluten Free', 'Vegan and Gluten Free', 'Vegetarian and Gluten Free')),
    CHECK (price_preference IN ('Free', 'Paid, no food points', 'Paid, food points')),
    CHECK (notif_preference IN ('Often', 'Sometimes', 'Never'))
);
