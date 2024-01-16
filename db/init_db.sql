-- WORK IN PROGRESS

DROP TABLE IF EXISTS Account CASCADE;
DROP TABLE IF EXISTS Admin CASCADE;
DROP TABLE IF EXISTS Student CASCADE;
DROP TABLE IF EXISTS Tutor CASCADE;
DROP TABLE IF EXISTS Academic_tutor CASCADE;
DROP TABLE IF EXISTS Enterprise_tutor CASCADE;
DROP TABLE IF EXISTS Company CASCADE;
DROP TABLE IF EXISTS Internship CASCADE;
DROP TABLE IF EXISTS Document CASCADE;
DROP TABLE IF EXISTS REPORT CASCADE;
DROP TABLE IF EXISTS CdC CASCADE;

CREATE TABLE IF NOT EXISTS Account(
    username VARCHAR,
    password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS Admin(
    admin_id SERIAL
) INHERITS (Account);

CREATE TABLE IF NOT EXISTS Student(
    student_id INT
) INHERITS(Account);

CREATE TABLE IF NOT EXISTS Tutor(
    tutor_id SERIAL
) INHERITS (Account);

CREATE TABLE IF NOT EXISTS Company(
    name VARCHAR,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS Academic_tutor(
    academic_tutor_id SERIAL,
    school_email VARCHAR
) INHERITS(Tutor);

CREATE TABLE IF NOT EXISTS Enterprise_tutor(
    enterprise_tutor_id SERIAL,
    enterprise_email VARCHAR,
    company_name VARCHAR,
    FOREIGN KEY(company_name) REFERENCES Company(name)
) INHERITS(Tutor);

CREATE TABLE IF NOT EXISTS Internship(
    id SERIAL,
    Title VARCHAR,
    date DATE,
    student_id INT,
    academic_tutor_id INT,
    enterprise_tutor_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(student_id) REFERENCES Student(student_id),
    FOREIGN KEY(enterprise_tutor_id) REFERENCES Enterprise_tutor(enterprise_tutor_id)
);

CREATE TABLE IF NOT EXISTS Document(
    document_id SERIAL,
    document_name VARCHAR,
    level_of_confidentiality INT,
    internship_id INT,
    PRIMARY KEY(document_id),
    FOREIGN KEY(internship_id) REFERENCES Internship(id)
);

CREATE TABLE IF NOT EXISTS REPORT(
    report_id SERIAL,
    report_name VARCHAR,
    PRIMARY KEY(report_id)
);

CREATE TABLE IF NOT EXISTS CdC(
    cdc_id SERIAL,
    cdc_name VARCHAR,
    PRIMARY KEY(cdc_id)
);