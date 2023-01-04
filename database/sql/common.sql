DROP TABLE IF EXISTS contracts;

CREATE TABLE contracts
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    money INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS products;

CREATE TABLE products
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    contract_id INTEGER      NOT NULL,
    type        VARCHAR(255) NOT NULL,
    start_date  DATE         NOT NULL,
    price       INTEGER      NOT NULL,
    FOREIGN KEY (contract_id) REFERENCES contracts (id)
);

DROP TABLE IF EXISTS persons;

CREATE TABLE persons
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    year       INTEGER NULL,
    email      VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
