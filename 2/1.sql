## 1
### 1.1
SELECT Student.*, SC.*
FROM Student,
     SC
WHERE Student.Sno = SC.Sno;
### 1.2
SELECT Student.Sno, Sname, Ssex, Sage, Cno, Grade
FROM Student,
     SC
WHERE Student.Sno = SC.Sno;

## 2
SELECT FIRST.Cno, SECOND.Cpno
FROM Course FIRST,
     Course SECOND
WHERE FIRST.Cpno = SECOND.Cno;

## 3
SELECT Student.Sno, Sname, Ssex, Sage, Sdept, Cno, Grade
FROM Student
         LEFT OUTER JOIN SC ON (Student.Sno = SC.Sno);

## 4
### 4.1
SELECT Student.Sno, Sname
FROM Student,
     SC
WHERE Student.Sno = SC.Sno
  AND SC.Cno = '2'
  AND SC.Grade >= 90;
### 4.2
SELECT Student.Sno, Sname, Cname, Grade
FROM Student,
     SC,
     Course
WHERE Student.Sno = SC.Sno
  AND SC.Cno = Course.Cno;

## 5
### 5.1
SELECT Sno, Sname, Sdept
FROM Student
WHERE Sdept IN
      (SELECT Sdept
       FROM Student
       WHERE Sname = '刘晨');
### 5.2
SELECT Sno, Sname, Sdept
FROM Student
WHERE Sdept =
      (SELECT Sdept
       FROM Student
       WHERE Sname = '刘晨');
### 5.3
SELECT s1.Sno, s1.Sname, s1.Sdept
FROM Student s1,
     Student s2
WHERE s1.Sdept = s2.Sdept
  AND s2.Sname = '刘晨';
### 5.4
SELECT Sno, Sname, Sdept
FROM Student S1
WHERE EXISTS
          (SELECT *
           FROM Student S2
           WHERE S2.Sdept = S1.Sdept
             AND S2.Sname = '刘晨');
### 5.5
SELECT Sno, Sname
FROM Student
WHERE Sno IN
      (SELECT Sno
       FROM SC
       WHERE Cno IN
             (SELECT Cno
              FROM Course
              WHERE Cname = '信息系统'
             )
      );
### 5.6
SELECT Student.Sno, Sname
FROM Student,
     SC,
     Course
WHERE Student.Sno = SC.Sno
  AND SC.Cno = Course.Cno
  AND Course.Cname = '信息系统';

## 6
SELECT Sno, Cno
FROM SC x
WHERE Grade >= (SELECT AVG(Grade)
                FROM SC y
                WHERE y.Sno = x.Sno);

## 7
### 7.1
SELECT Sname, Sage
FROM Student
WHERE Sage < ANY (SELECT Sage
                  FROM Student
                  WHERE Sdept = 'CS')
  AND Sdept <> 'CS';
### 7.2
SELECT Sname, Sage
FROM Student
WHERE Sage < (SELECT MAX(Sage)
              FROM Student
              WHERE Sdept = 'CS')
  AND Sdept <> 'CS';
### 7.3
SELECT Sname, Sage
FROM Student
WHERE Sage < ALL (SELECT Sage
                  FROM Student
                  WHERE Sdept = 'CS')
  AND Sdept <> 'CS';
### 7.4
SELECT Sname, Sage
FROM Student
WHERE Sage < (SELECT MIN(Sage)
              FROM Student
              WHERE Sdept = 'CS')
  AND Sdept <> 'CS';

## 8
### 8.1
SELECT Sname
FROM Student
WHERE EXISTS
          (SELECT *
           FROM SC
           WHERE Sno = Student.Sno
             AND Cno = '1');
### 8.2
SELECT Sname
FROM Student
WHERE NOT EXISTS
    (SELECT *
     FROM SC
     WHERE Sno = Student.Sno
       AND Cno = '1');
### 8.3
SELECT Sname
FROM Student
WHERE NOT EXISTS
    (SELECT *
     FROM Course
     WHERE NOT EXISTS
         (SELECT *
          FROM SC
          WHERE Sno = Student.Sno
            AND Cno = Course.Cno));
### 8.4
SELECT DISTINCT Sno
FROM SC SCX
WHERE NOT EXISTS
    (SELECT *
     FROM SC SCY
     WHERE SCY.Sno = '200215122'
       AND NOT EXISTS
         (SELECT *
          FROM SC SCZ
          WHERE SCZ.Sno = SCX.Sno
            AND SCZ.Cno = SCY.Cno));

## 9
### 9.1
SELECT *
FROM Student
WHERE Sdept = 'CS'
UNION
SELECT *
FROM Student
WHERE Sage <= 19;
### 9.2
SELECT *
FROM Student
WHERE Sdept = 'CS'
   OR Sage <= 19;
### 9.3
# SELECT Sno
# FROM SC
# WHERE Cno = '1'
#     INTERSECT
# SELECT Sno
# FROM SC
# WHERE Cno = '2';
### 9.4
SELECT Sno
FROM SC
WHERE Cno = '1'
  AND Sno IN
      (SELECT Sno
       FROM SC
       WHERE Cno = '2');
### 9.5
# SELECT *
# FROM Student
# WHERE Sdept = 'CS'
#     EXCEPT
# SELECT *
# FROM Student
# WHERE Sage <= 19;
### 9.6
SELECT *
FROM Student
WHERE Sdept = 'CS'
  AND Sage > 19;

## 10
UPDATE Student
SET Sage = Sage + 1
WHERE Sdept = 'IS';

## 11
DELETE
FROM Student
WHERE Sno = '200215121';

## 12
INSERT
INTO SC(Sno, Cno)
VALUES ('200215122', '1');