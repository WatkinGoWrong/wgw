CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS QUESTIONS (
    QUESTIONID UUID DEFAULT uuid_generate_v4 (), 
    DATEADDED TIMESTAMP default current_timestamp,
    QUESTION VARCHAR(5000) NOT NULL
    UNIQUE(QUESTION)
);

CREATE TABLE IF NOT EXISTS QUESTIONSLOGGING (
    QUESTIONID UUID NOT null, 
    DATEADDED TIMESTAMP default current_timestamp,
    IPADDRESS VARCHAR(5000) NOT NULL
);

INSERT INTO QUESTIONS (QUESTION) 
VALUES
('Height - Shortest to Tallest'),
('Height - Tallest to Shortest'),
('Age - Youngest to Oldest'),
('Age - Oldest to Youngest'),
('Birthday - Closest to Furthest'),
('Birthday - Furthest to Closest'),
('First Name - Alphabetically from A -> Z'),
('First Name - Alphabetically from Z -> A'),
('Last Name - Alphabetically from A -> Z'),
('Last Name - Alphabetically from Z -> A'),
('Last Watched A Nicholas Cage Movie - Closest to Furthest'),
('Last Watched A Nicholas Cage Movie - Furthest to Closest'),
('Finger Nails - Longest to Shortest'),
('Finger Nails - Shortest to Longest'),
('Rock Paper scissors - First Out to Last Out'),
('Rock Paper scissors - Last Out to First Out'),
('Whoever can shout the loudest'),
('Play Coup - Winner to Loser')
ON CONFLICT DO NOTHING;

