# Q1
select Sno, Sname, Sage
from Student;

# Q2
select *
from Student
where Sdept = 'CS';

# Q3
select Sno, Grade, Cname
from SC,
     Course
where SC.Cno = Course.Cno
  and (Grade >= 90
    or Grade < 60);

# Q4
select Sname, Ssex, Sage
from Student
where not (Sage >= 19 and Sage <= 20);

# Q5
select Sname, Sdept
from Student
where Sdept in ('MA', 'IS');

# Q6
select Cno, Cname, Ccredit
from Course
where Cname like '%数据%';

# Q7
select Sno, Cno
from SC
where Grade is null;

# Q8
select MAX(Grade), Min(Grade), AVG(Grade)
from SC
where Sno = '200215121';

# Q9
select Sno, Grade
from SC
where Cno = '2'
order by Grade;

# Q10
select Sdept, AVG(Sage)
from Student
group by Sdept;

# Q10+
select Sdept, AVG(Sage)
from Student
group by Sdept
having AVG(Sage) <= 19;
