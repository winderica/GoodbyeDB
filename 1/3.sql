## insert values
insert into Student
values ('200215121', '李勇', '男', 20, 'CS', '否');
insert into Student
values ('200215122', '刘晨', '女', 19, 'CS', '否');
insert into Student
values ('200215123', '王敏', '女', 18, 'MA', '否');
insert into Student
values ('200215125', '张立', '男', 19, 'IS', '否');

insert into Course
values ('1', '数据库', NULL, 4);
insert into Course
values ('2', '数学', NULL, 2);
insert into Course
values ('3', '信息系统', NULL, 4);
insert into Course
values ('4', '操作系统', NULL, 3);
insert into Course
values ('5', '数据结构', NULL, 4);
insert into Course
values ('6', '数据处理', NULL, 2);
insert into Course
values ('7', 'java', NULL, 4);

update Course
set Cpno = '5'
where Cno = '1';
update Course
set Cpno = '1'
where Cno = '3';
update Course
set Cpno = '6'
where Cno = '4';
update Course
set Cpno = '7'
where Cno = '5';
update Course
set Cpno = '6'
where Cno = '7';

insert into SC
values ('200215121', '1', 92);
insert into SC
values ('200215121', '2', 85);
insert into SC
values ('200215121', '3', 88);
insert into SC
values ('200215122', '2', 90);
insert into SC
values ('200215122', '3', 80);
