# 数据操作 - 更新数据 - 多列与表达式更新

## 教程

上一关的 update 一次只更新了一列。其实 set 子句可以同时更新多列,用逗号分隔即可:

```sql
update 表名 set 列名1 = 新值1, 列名2 = 新值2 where 条件;
```

而且新值不一定是固定值,还可以是表达式——比如基于原值进行计算:

```sql
update student set score = score + 10 where class_id = 4;
```

这条语句表示:4 班所有学生的分数在原有基础上加 10 分。数据库会逐行读取 score 的原值,加 10 后再写回。

## 示例

学校搞活动,3 班所有学生年龄加 1、分数加 5(别问,问就是活动规则)。3 班目前是:

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 5 | 李阿巴 | 19 | 3 | 120 | 2 |
| 6 | 老李 | 56 | 3 | 500 | 4 |

执行更新:

```sql
update student set age = age + 1, score = score + 5
where class_id = 3;
```

再查询验证:

```sql
select * from student;
```

查询结果(3 班两行):

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 5 | 李阿巴 | 20 | 3 | 125 | 2 |
| 6 | 老李 | 57 | 3 | 505 | 4 |

两人的 age 和 score 都在原值基础上按表达式更新,其他班级一行未动。set 后面的多个赋值用逗号分隔。

## 题目

请编写 SQL 完成以下操作:

1. 将 student 表中 4 班(class_id = 4)所有学生的 exam_num 增加 1、score 增加 10;
2. 通过 `select * from student` 查询更新后的完整学生表。
