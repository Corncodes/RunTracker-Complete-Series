CREATE TABLE runs (
    id SERIAL PRIMARY KEY,
    distance_miles FLOAT NOT NULL,
    pace VARCHAR(20) NOT NULL,
    run_date DATE NOT NULL
);

INSERT INTO runs (distance_miles, pace, run_date)
VALUES (3.5, '8:30', '2024-06-01');