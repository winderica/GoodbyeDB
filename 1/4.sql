# 1
SELECT Sno, Sname, Ssex, Sage, Sdept
FROM Student;

# 2
SELECT Student.Sno, Student.Sname
FROM Student,
     SC
WHERE Student.Sno = SC.Sno
  AND SC.Cno = '2'
  AND SC.Grade >= 90;

# 3.1
SELECT Sname, Ssex
FROM Student
WHERE Sdept IN ('IS', 'MA', 'CS');

# 3.2
SELECT Sname, Sdept, Sage
FROM Student
WHERE Sage BETWEEN 20 AND 23;

# 4
SELECT Sname, Sno, Ssex
FROM Student
WHERE Sname LIKE '刘%';

# 5
SELECT Sno, Grade
FROM SC
WHERE Cno = '3'
ORDER BY Grade DESC;

# 6
SELECT AVG(Grade)
FROM SC
WHERE Cno = '1';

# 7
SELECT Sno
FROM SC
GROUP BY Sno
HAVING COUNT(*) >= 3;
