DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    session_id VARCHAR(255)                      NOT NULL,
    data       TEXT                              NOT NULL
);
