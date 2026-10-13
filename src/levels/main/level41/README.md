# 数据操作 - 事务 - 保存点

## 教程

rollback 会把整个事务"一键还原",但有时我们只希望撤销事务中的**一部分**操作。保存点(savepoint)就是事务内部的"存档":

```sql
begin;
-- SQL 1
savepoint sp1;      -- 存档
-- SQL 2
rollback to sp1;    -- 只撤销 SQL 2,SQL 1 保留
commit;             -- 提交剩余的部分
```

典型场景:批量导入 1000 条数据,第 800 条格式错误,不必全部重来,回滚到导入前的保存点即可。

## 示例

批量导入三名转学生:小新(25 岁,2 班,500 分,考试 3 次)、小葵(19 岁,1 班,400 分,考试 2 次)、错错(18 岁,3 班,100 分,考试 1 次)。导完第三名发现"错错"的信息录错了,但前两名是正确的,只想撤销他这一条:

```sql
begin;
insert into student (name, age, class_id, score, exam_num) values ('小新', 25, 2, 500, 3);
savepoint sp1;
insert into student (name, age, class_id, score, exam_num) values ('小葵', 19, 1, 400, 2);
savepoint sp2;
insert into student (name, age, class_id, score, exam_num) values ('错错', 18, 3, 100, 1);
rollback to sp2;
commit;
select * from student;
```

查询结果(节选):

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 10 | 孙加加 | 60 | 5 | 100.5 | 1 |
| 11 | 小新 | 25 | 2 | 500 | 3 |
| 12 | 小葵 | 19 | 1 | 400 | 2 |

rollback to sp2 只撤销了错错的插入,小新和小葵保留(自增 id 11、12),学生表比初始多 2 行。保存点就是事务内部的"存档点"。

## 题目

请编写 SQL 完成以下操作:

1. 开启事务,依次插入三名转学生:大聪明(30,2,555,2)、小机灵(21,1,444,1)、小迷糊(19,2,199,1),并在每次插入后设置保存点(sp1、sp2);
2. 发现小迷糊的信息有误,回滚到 sp2,只撤销小迷糊的插入;
3. 提交事务,通过 `select * from student` 查询验证(大聪明和小机灵应保留)。
