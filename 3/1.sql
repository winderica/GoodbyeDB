# 1
create or replace view CS_View as
select *
from Student
where Sdept = 'CS';

# 2
select CS_View.Sno, Sname, Ssex, Sage, Sdept, Scholarship
from CS_View,
     SC
where Cno = '1'
  and CS_View.Sno = SC.Sno;

# 3
create or replace view IS_View as
select distinct Student.Sno, Sname, Ssex, Sage, Sdept, Scholarship
from Student,
     SC
where Student.Sno = SC.Sno
  and Grade > 80
  and Sdept = 'IS';

# 4
select *
from IS_View;

# 5
drop view if exists IS_View;

# 6.0 root
create user if not exists 'U1' identified by '12345678';
create user if not exists 'U2' identified by '12345678';
grant select, update on Student to 'U1';
grant insert on SC to 'U2';

# 6.1 U1
select *
from Student;
update Student
set Sage = Sage + 1;
delete
from Student
where Sdept = 'IS';
select *
from Student,
     SC
where Student.Sno = SC.Sno
  and Student.Sdept = 'SC';

# 6.2 U2
insert into SC
values ('200215122', '1', 75);
select *
from SC;
select *
from CS_View;

# 7 root
revoke all privileges on Student from 'U1';
select *
from mysql.tables_priv;

# 8 U1
select *
from Student;

# 9 root

# 10
create trigger update_scholarship
    after update
    on SC
    for each row
begin
    if NEW.Grade >= 95 then
        update Student set Scholarship ='是' where NEW.Sno = Student.Sno and Scholarship = '否';
    else
        if OLD.Grade > 95 and not exists(select * from SC where SC.Sno = NEW.Sno and Grade > 95) then
            update Student set Scholarship = '否' where NEW.Sno = Student.Sno;
        end if;
    end if;
end;
update SC
set Grade = 98
where Sno = '200215121';
select *
from Student
where Sno = '200215121';
update SC
set Grade = 80
where Sno = '200215121';
select *
from Student
where Sno = '200215121';

# 11
drop trigger if exists update_scholarship;

# 12
drop procedure if exists query_grade;
create procedure query_grade()
begin
    select avg(Grade), max(Grade)
    from Student,
         SC
    where Student.Sno = SC.Sno
      and Sdept = 'CS';
end;
call query_grade();

# 13
drop procedure if exists query_all_grade;
create procedure query_all_grade(in q char(9))
begin
    select Sname, Grade, Cname
    from Student,
         SC,
         Course
    where Student.Sno = q
      and SC.Sno = q
      and SC.Cno = Course.Cno;
end;
call query_all_grade('200215121');

# 14
drop function if exists query_all_grade_function;
create function query_all_grade_function(q char(9)) returns varchar(100)
    reads sql data
begin
    declare test varchar(100);
    select concat(Sname, ' ', group_concat(kv separator ', '))
    into test
    from (
             select concat(Cname, ': ', Grade) as kv, Sname
             from Student,
                  SC,
                  Course
             where Student.Sno = q
               and SC.Sno = q
               and SC.Cno = Course.Cno
         ) temp;
    return test;
end;
select query_all_grade_function('200215121');

# 15
update SC
set Grade = 120
where Sno = '200215121'
  and Cno = '1';
select * from SC where Sno = '200215121' and Cno = '1';
update SC
set Grade = 92
where Sno = '200215121'
  and Cno = '1';
alter table SC
    add constraint score check ( Grade >= 0 and Grade <= 100 );
update SC
set Grade = 120
where Sno = '200215121'
  and Cno = '1';
select * from SC where Sno = '200215121' and Cno = '1';