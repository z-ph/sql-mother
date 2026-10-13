# 数据操作 - 删除数据 - 条件删除

## 教程

对于不再需要的数据,可以用 delete 语句删除,语法如下:

```sql
delete from 表名 where 删除条件;
```

和 update 一样,where 子句同样重要:不写 where 会删除整张表的数据!比如 `delete from student` 会让学生表瞬间清零,务必谨慎。

删除条件支持我们学过的所有查询条件:比较运算、逻辑运算、模糊匹配、空值判断、子查询等等。

## 示例

学生表中有两名同学严重不及格:鸡哥(2.5 分)和王加瓦(0 分)。现在要把分数小于 100 的学生移除:

```sql
delete from student where score < 100;
```

再查询验证:

```sql
select * from student;
```

学生表将只剩 8 行,鸡哥和王加瓦已被删除。

## 题目

请编写 SQL 完成以下操作:

1. 删除 student 表中 score 小于 100 的学生;
2. 通过 `select * from student` 查询删除后剩余的学生。
