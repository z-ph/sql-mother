# 表结构 - 创建表

## 教程

到目前为止,我们操作的 student 表都是关卡帮你建好的。但在真实项目中,表从哪里来?

这就要学习 DDL(数据定义语言)了。SQL 语句大致分三类:

- DDL:定义表结构,如 create table、alter table、drop table;
- DML:操作表数据,如 insert、update、delete(增删改);
- DQL:查询数据,即 select(前 30 关学的就是它)。

创建表使用 create table 语句:

```sql
create table 表名 (
    列名1 数据类型 约束,
    列名2 数据类型 约束,
    ...
);
```

常见的数据类型有:integer(整数)、real(小数)、text(文本)、varchar(定长文本)等。SQLite 的类型比较灵活,同一个列甚至能存不同类型的数据(不推荐这么做)。

常见的列约束:

- not null:该列不允许为空;
- default 值:不填时的默认值;
- primary key:主键,唯一标识每一行,一张表一个;
- autoincrement:整数主键自动递增,插入时不用手动指定;
- unique:值不能重复;check(条件):检查约束(本关在 level46 实战)。

## 示例

演示创建一张图书表(与题目无关,仅供理解语法):

```sql
create table book (
    id integer not null primary key autoincrement,
    title varchar(256) not null,
    price real default 9.9
);
insert into book (title, price) values ('SQL 从入门到不放弃', 59.9);
select * from book;
```

可以看到新表建好并插入了一行数据,price 不填时会用默认值。

## 题目

student 表一直只有学生数据,现在学校想录入老师信息。请编写 SQL 完成以下操作:

1. 创建 teacher 表,要求:
   - id:整数,非空,自增主键;
   - name:可变长字符串,非空;
   - age:整数;
   - subject:可变长字符串(64),非空,表示教授科目;
   - work_years:整数,默认值 0,表示工龄;
2. 插入两位老师:张老师(35 岁,数学,工龄 8)、李老师(28 岁,英语,工龄 3);
3. 通过 `select * from teacher` 查询验证。
