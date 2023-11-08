CREATE TABLE Preferences (
    uid INT,
    food_preference ENUM('No Preference', 'Vegan', 'Vegetarian', 'Gluten Free', 'Vegan and Gluten Free', 'Vegetarian and Gluten Free'),
    price_preference ENUM('Free', 'Paid, no food points', 'Paid, food points'),
    notif_preference ENUM('Often', 'Sometimes', 'Never'),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);
