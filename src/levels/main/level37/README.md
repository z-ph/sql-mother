# 数据操作 - 删除数据 - 清空表数据

## 教程

如果一张表的数据全都不需要了,可以不写 where 条件,直接删除所有行:

```sql
delete from 表名;
```

注意区分三个容易混淆的概念:

- `delete from 表名`:删除表中**所有数据**,但表结构保留,之后还能继续插入;
- `drop table 表名`:直接删除**整张表**(数据和结构一起消失);
- truncate table:部分数据库(如 MySQL)提供的快速清空语法,效果等同 delete 无 where,但速度更快、通常不可回滚。本关使用的 SQLite 不支持 truncate。

本关的示例数据中有一张临时表 temp_student(3 行测试数据),练习目标就是清空它。

## 示例

本关的示例数据中有一张临时表 temp_student(3 行测试数据):

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | 临时1 | 20 | 1 | 60 | 1 |
| 2 | 临时2 | 21 | 2 | 70 | 2 |
| 3 | 临时3 | 22 | 3 | 80 | 3 |

先看当前数据量:

```sql
select count(*) as remain from temp_student;
```

结果:remain = 3。然后清空整张表:

```sql
delete from temp_student;
```

再查一次剩余条数:

```sql
select count(*) as remain from temp_student;
```

结果:remain = 0,但表还在——数据被清空,表结构保留,之后仍能继续插入。

## 题目

请编写 SQL 完成以下操作:

1. 清空 temp_student 表中的所有数据(**不要**使用 drop table,要保留表结构);
2. 通过 `select count(*) as remain from temp_student` 查询剩余条数验证,结果应为 0。
