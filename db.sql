CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(64) UNIQUE,
    password VARCHAR(124),
    createdat VARCHAR(64) NOT NULL,
    updatedat VARCHAR(64) 
);

CREATE TABLE students(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    rollno INTEGER UNIQUE NOT NULL,
    createdat VARCHAR(64) NOT NULL,
    updatedat VARCHAR(64) 
);

CREATE TABLE educational_details(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    studentid uuid NOT NULL,
    institute_name VARCHAR(64),
    qualification_category VARCHAR(64),
    year_of_passing VARCHAR(64),
    createdat VARCHAR(64) NOT NULL,
    updatedat VARCHAR(64) ,
    FOREIGN KEY (studentid) REFERENCES students (id)
);