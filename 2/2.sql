# Q1
select Course.Cno, Cname, Sno, Grade
from Course
         left outer join SC on Course.Cno = SC.Cno
order by Cno;

# Q2 1
select Sno, Sname, Sage
from Student
where Sage = (select Sage from Student where Sname = '张立');

# Q2 2
select Sno, Sname, Sage
from Student
where Sage in (select Sage from Student where Sname = '张立');

# Q2 3
select S1.Sno, S1.Sname, S1.Sage
from Student S1,
     Student S2
where S1.Sage = S2.Sage
  and S2.Sname = '张立';

# Q3
select Student.Sno, Sname
from Student,
     SC
where Student.Sno = SC.Sno
  and Grade >= 80
  and Grade < 90
  and Cno = '3';

# Q4 1
select SC.Cno, Cname
from SC,
     Course
where SC.Sno = '200215122'
  and SC.Cno = Course.Cno;

# Q4 2
select SC.Cno, Cname, Grade
from SC,
     Course
where SC.Sno = '200215122'
  and SC.Cno = Course.Cno;

# Q5
select Sno, Cno
from SC SC1
where Grade + 5 < (select avg(Grade) from SC where SC.Sno = SC1.Sno);

# Q6
select Sno, Sname, Sage
from Student
where Ssex = '女'
  and Sage < all (select Sage from Student where Ssex = '男');

# Q7
select Sname, Sdept
from Student,
     SC
where Student.Sno = SC.Sno
  and SC.Cno = '2';

# Q8
update Student, SC
set Sage = Sage + 2
where Student.Sno = SC.Sno
  and Grade >= 80
  and Grade < 90;
select *
from Student;

# Q9
insert into Course(Cno, Cname, Cpno, Ccredit)
values ('8', 'C语言', null, 3),
       ('9', '人工智能', null, 3);
select *
from Course;

# Q10

delete
from Course
where Cname = '人工智能';
select *
from Course;
