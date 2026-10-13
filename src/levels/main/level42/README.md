# 数据操作 - 事务与并发 - 综合练习

## 教程

最后一关聊聊事务为什么重要。现实中,数据库往往被**多个用户/程序同时访问**,由此可能产生三类经典问题:

- 脏读(Dirty Read):A 的事务改了一半还没提交,B 就读到了这些"半成品"数据,随后 A 又回滚了——B 读到的就是脏数据;
- 不可重复读(Non-repeatable Read):B 在同一个事务里两次读取同一行,中间被 A 修改并提交,两次结果不一样;
- 幻读(Phantom Read):B 两次统计同一批数据,中间 A 插入了新行,第二次多出了"幻影"行。

解决办法是给事务设置**隔离级别**,从弱到强依次为:Read Uncommitted(可能脏读)→ Read Committed(读已提交)→ Repeatable Read(可重复读)→ Serializable(完全串行化)。级别越强,一致性越好,但并发性能越差,需要根据业务权衡。

底层则依靠**锁**实现:读数据加读锁(共享)、写数据加写锁(独占),写写、读写互斥,从而避免相互干扰。

需要说明的是,本网站在浏览器里使用单连接 SQLite,同一时间只有你在操作,默认是最高等级的串行化,因此无法真实演示上面的并发交错场景。但事务语法(begin/commit/rollback/savepoint)与大型数据库(MySQL、PostgreSQL 等)完全通用,请务必通过本关的动手练习掌握它。

## 示例

把增、改、删三件事包进一个事务:

```sql
begin;
insert into student (name, age, class_id, score, exam_num)
values ('事务小子', 26, 3, 333, 3);
update student set score = 220 where name = '李阿巴';
delete from student where score < 1;
commit;
select * from student;
```

任何一步失败,都可以整体 rollback,不会出现"只插入了一半"的中间状态。

## 题目

请编写 SQL 完成以下操作(注意把三步写进同一个事务):

1. 开启事务,插入新学生:姓名 事务小子,年龄 26,班级编号 3,分数 333,考试次数 3;
2. 在同一事务中将 李阿巴 的 score 更新为 220;
3. 在同一事务中删除所有 score 小于 1 的学生;
4. 提交事务,通过 `select * from student` 查询最终的学生表。
