# 数据操作 - 插入数据 - 插入查询结果

## 教程

插入数据还有一种进阶玩法:把查询的结果直接插入另一张表,语法如下:

```sql
insert into 目标表 select 查询语句;
```

要求目标表和查询结果的结构(列数、列类型)一致或兼容。这种写法常用于数据备份、归档、汇总,比如把满足条件的旧数据迁移到历史表中。

本关的示例数据里准备了一张空表 student_archive,它的结构和 student 完全一致,专门用来归档优秀学生。

## 示例

本关把分数大于等于 500 的学生归档到 student_archive:

```sql
insert into student_archive
select * from student
where score >= 500;
```

再查询归档表:

```sql
select * from student_archive;
```

可以看到热dog(600)、老李(500)、赵派森(600)共 3 人被复制了过去。注意:条件写错,归档的结果就不同,做题时要看清题目的要求。

## 题目

请编写 SQL 完成以下操作:

1. 将 student 表中 score 大于等于 400 的学生(全部字段)插入到 student_archive 表;
2. 通过 `select * from student_archive` 查询归档结果。
