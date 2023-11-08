CREATE TABLE Users (
    uid INT PRIMARY KEY,
    netid VARCHAR(7) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    numReports INT DEFAULT 0,
    isBanned BOOLEAN DEFAULT FALSE
);
