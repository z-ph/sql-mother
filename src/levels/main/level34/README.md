# 数据操作 - 更新数据 - 基础更新

## 教程

数据不是一成不变的,比如学生涨分了、班级调整了,这时就要用到 update 更新语句,语法如下:

```sql
update 表名 set 列名 = 新值 where 更新条件;
```

⚠️ 特别注意:where 子句非常重要!如果不写 where 条件,update 会更新表中的**所有行**。比如 `update student set score = 0` 会让所有人的分数清零——这在真实生产环境中是重大事故,操作前一定要确认条件无误。

## 示例

李阿巴上次考试发挥失常,只有 120 分;复核试卷后,确认他的分数应为 150 分。student 表中他这一行目前是:

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 5 | 李阿巴 | 19 | 3 | 120 | 2 |

用 update 把这一行的 score 改成 150:

```sql
update student set score = 150 where name = '李阿巴';
```

再查询验证:

```sql
select * from student;
```

查询结果(李阿巴所在行):

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 5 | 李阿巴 | 19 | 3 | 150 | 2 |

只有李阿巴那一行发生了变化,其他同学不受影响。如果漏写 where 条件,所有行的 score 都会被改成同一个值——这就是 update 必须带条件的理由。

## 题目

请编写 SQL 完成以下操作:

1. 将 student 表中 鸡哥 的 score 更新为 90;
2. 通过 `select * from student` 查询更新后的完整学生表。
