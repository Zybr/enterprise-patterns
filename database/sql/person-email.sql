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
