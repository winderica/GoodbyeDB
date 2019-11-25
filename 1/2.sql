## create DB
# create database if not exists S_T_Uxxxxxxxxx;
# use S_T_Uxxxxxxxxx;

## create tables
create table if not exists Student
(
    Sno         CHAR(9) PRIMARY KEY,
    Sname       CHAR(20) UNIQUE,
    Ssex        CHAR(2),
    Sage        SMALLINT,
    Sdept       CHAR(20),
    Scholarship char(2)
);
desc Student;

create table if not exists Course
(
    Cno     CHAR(4) PRIMARY KEY,
    Cname   CHAR(40),
    Cpno    CHAR(4),
    Ccredit SMALLINT,
    FOREIGN KEY (Cpno) REFERENCES Course (Cno)
);
desc Course;

create table if not exists SC
(
    Sno   CHAR(9),
    Cno   CHAR(4),
    Grade SMALLINT,
    primary key (Sno, Cno),
    FOREIGN KEY (Sno) REFERENCES Student (Sno),
    FOREIGN KEY (Cno) REFERENCES Course (Cno)
);
desc SC;
