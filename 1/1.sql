## create DB
# create database if not exists CSEDB_Uxxxxxxxxx;
# use CSEDB_Uxxxxxxxxx;

## create tables
CREATE TABLE if not exists Student
(
    Sno         CHAR(5) NOT NULL UNIQUE,
    Sname       CHAR(20) UNIQUE,
    Ssex        CHAR(1),
    Sage        INT,
    Sdept       CHAR(15),
    Scholarship CHAR(2)
);
desc Student;

CREATE TABLE if not exists SC
(
    Sno   CHAR(5),
    Cno   CHAR(3),
    Grade int,
    Primary key (Sno, Cno)
);
desc SC;

## alter tables
ALTER TABLE Student
    add Scome DATETIME;
ALTER TABLE Student
    modify COLUMN Sage SMALLINT;
desc Student;

## create indexes
CREATE UNIQUE INDEX Stusno ON Student (Sno);
show indexes from Student;
# CREATE UNIQUE INDEX Coucno ON Course (Cno);
CREATE UNIQUE INDEX SCno ON SC (Sno ASC, Cno DESC);
show indexes from SC;

## drop indexes
DROP INDEX Stusno on Student;
show indexes from Student;

## drop tables
DROP TABLE Student;
show tables;

## drop DB
# drop database CSEDB_Uxxxxxxxxx;
# show databases;
