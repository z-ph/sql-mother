# 数据操作 - 事务 - 事务基础

## 教程

前面几关的增删改都是"单条语句立即可见"。但在真实业务中,多个写操作往往必须**同生共死**:比如转账,扣款和收款必须同时成功,任何一步失败都不能让钱凭空消失或凭空出现。

事务(Transaction)就是为此而生的机制。把一组 SQL 包在一个事务里,它们就具备原子性(Atomicity):要么全部生效(commit 提交),要么全部不生效(rollback 回滚)。这也是数据库著名的一致性原则 ACID 中的 A。

SQLite 中事务的基本语法:

```sql
begin;          -- 开启事务
-- 这里写一组 SQL,增删改都可以
commit;         -- 全部成功,提交生效
```

## 示例

老李要转 50 分给李阿巴,两步更新必须一起生效:

```sql
begin;
update student set score = score - 50 where name = '老李';
update student set score = score + 50 where name = '李阿巴';
commit;
select * from student;
```

执行后:老李的分数从 500 变成 450,李阿巴从 120 变成 170,两人总分保持不变——这就是事务保证的原子性。

## 题目

请编写 SQL 完成以下操作:

1. 开启事务,完成"鱼皮转 100 分给鸡哥":鱼皮的 score 减少 100,鸡哥的 score 增加 100;
2. 提交事务;
3. 通过 `select * from student` 查询转账后的完整学生表。
