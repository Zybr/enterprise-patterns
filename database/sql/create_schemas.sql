DROP TABLE IF EXISTS products;

CREATE TABLE products
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    type       VARCHAR(255) NOT NULL,
    start_date DATE         NOT NULL,
    price      INT          NOT NULL
);

DROP TABLE IF EXISTS budgets;

CREATE TABLE budgets
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    money INT NOT NULL
);
