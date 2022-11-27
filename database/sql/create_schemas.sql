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
    contract_id INTEGER                           NOT NULL,
    type        VARCHAR(255)                      NOT NULL,
    start_date  DATE                              NOT NULL,
    price       INTEGER                           NOT NULL,
    FOREIGN KEY (contract_id) references contracts (id)
);
