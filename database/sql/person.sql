DROP TABLE IF EXISTS emails;

CREATE TABLE emails
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    mail TEXT                              NOT NULL
);

DROP TABLE IF EXISTS persons;

CREATE TABLE persons
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name VARCHAR(255)                      NOT NULL,
    last_name  VARCHAR(255)                      NOT NULL,
    email_id   INTEGER                           NOT NULL, -- TODO: Replace to "email.person_id"
    FOREIGN KEY (email_id) REFERENCES emails (id)
);

DROP TABLE IF EXISTS employments;

CREATE TABLE employments
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    person_id       INTEGER                           NOT NULL,
    start           DATE                              NOT NULL,
    end             DATE                              NOT NULL,
    salary_amount   REAL                              NOT NULL,
    salary_currency VARCHAR(3)
)
