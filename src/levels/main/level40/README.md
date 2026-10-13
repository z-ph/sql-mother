# 数据操作 - 事务 - 事务回滚

## 教程

事务的另一半是回滚:当事务中的某一步出问题(余额不足、校验失败、系统崩溃)时,用 rollback 撤销事务里的**所有**修改,让数据回到 begin 之前的状态。

```sql
begin;
-- 一组 SQL
rollback;       -- 全部撤销,数据恢复原样
```

转账是最典型的例子:扣款成功但收款失败时,必须回滚,否则钱就丢了。

## 示例

孙加加一时冲动,想转 200 分给摸FISH,但他自己只有 100.5 分,余额根本不够。两人当前数据:

| id | name | age | class_id | score | exam_num |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 4 | 摸FISH | null | 2 | 360 | 4 |
| 10 | 孙加加 | 60 | 5 | 100.5 | 1 |

把两条 update 放进事务,然后整体回滚:

```sql
begin;
update student set score = score - 200 where name = '孙加加';
update student set score = score + 200 where name = '摸FISH';
rollback;
```

再查询验证:

```sql
select * from student;
```

查询结果:学生表仍是初始的 10 行数据——孙加加依旧是 100.5 分,摸FISH依旧是 360 分,什么都没有发生。rollback 把 begin 之后的所有修改都撤销了。

## 题目

请编写 SQL 完成以下操作:

1. 开启事务,执行"鸡哥转 500 分给热dog"的两条 update(鸡哥 score 减少 500,热dog score 增加 500);
2. 由于鸡哥余额不足,**回滚**整个事务;
3. 通过 `select * from student` 查询,验证数据没有任何变化。
