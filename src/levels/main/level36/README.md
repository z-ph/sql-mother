# 数据操作 - 删除数据 - 条件删除

## 教程

对于不再需要的数据,可以用 delete 语句删除,语法如下:

```sql
delete from 表名 where 删除条件;
```

和 update 一样,where 子句同样重要:不写 where 会删除整张表的数据!比如 `delete from student` 会让学生表瞬间清零,务必谨慎。

删除条件支持我们学过的所有查询条件:比较运算、逻辑运算、模糊匹配、空值判断、子查询等等。

## 示例

教务处规定:考试次数(exam_num)为 1 的学生需要重新建档,先从学生表移除。符合条件的是:

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | 鸡哥 | 25 | 1 | 2.5 | 1 |
| 10 | 孙加加 | 60 | 5 | 100.5 | 1 |

执行删除:

```sql
delete from student where exam_num = 1;
```

再查询验证:

```sql
select * from student;
```

查询结果:学生表只剩 8 行,鸡哥和孙加加已被删除。删除条件支持我们学过的所有查询语法,条件不同删掉的行也不同——做题时要看清题目给的条件。

## 题目

请编写 SQL 完成以下操作:

1. 删除 student 表中 score 小于 100 的学生;
2. 通过 `select * from student` 查询删除后剩余的学生。
