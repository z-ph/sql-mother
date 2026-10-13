# 数据操作 - 更新数据 - 基础更新

## 教程

数据不是一成不变的,比如学生涨分了、班级调整了,这时就要用到 update 更新语句,语法如下:

```sql
update 表名 set 列名 = 新值 where 更新条件;
```

⚠️ 特别注意:where 子句非常重要!如果不写 where 条件,update 会更新表中的**所有行**。比如 `update student set score = 0` 会让所有人的分数清零——这在真实生产环境中是重大事故,操作前一定要确认条件无误。

## 示例

鸡哥平时摸鱼太多,考试成绩只有 2.5 分。经过努力学习,他决定把分数改到 90:

```sql
update student set score = 90 where name = '鸡哥';
```

再用全表查询确认:

```sql
select * from student;
```

可以看到鸡哥那一行的 score 变成了 90,其他同学的分数不受影响。

## 题目

请编写 SQL 完成以下操作:

1. 将 student 表中 鸡哥 的 score 更新为 90;
2. 通过 `select * from student` 查询更新后的完整学生表。
