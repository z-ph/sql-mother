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

鸡哥一时冲动,想给热dog转 500 分。但鸡哥只有 2.5 分,余额根本不够!我们先把两步更新放进事务,再回滚它:

```sql
begin;
update student set score = score - 500 where name = '鸡哥';
update student set score = score + 500 where name = '热dog';
rollback;
select * from student;
```

rollback 执行后,两条 update 都被撤销,学生表保持初始的 10 行数据——鸡哥依旧是 2.5 分,热dog依旧是 600 分,什么都没有发生。

## 题目

请编写 SQL 完成以下操作:

1. 开启事务,执行"鸡哥转 500 分给热dog"的两条 update(鸡哥 score 减少 500,热dog score 增加 500);
2. 由于鸡哥余额不足,**回滚**整个事务;
3. 通过 `select * from student` 查询,验证数据没有任何变化。
