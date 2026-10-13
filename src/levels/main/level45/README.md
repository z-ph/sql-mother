# 表结构 - 表数据迁移

## 教程

业务需求总在变化,表结构也要跟着演进:加字段、拆表、合表……这类升级操作称为**迁移(migration)**。

上一关说过,SQLite 不能直接修改已有列的类型或约束,官方推荐的改结构方式是"重建表",核心流程四步:

1. 按新结构 create table 一张新表(比如 xxx_new);
2. 用 `insert into 新表 select ... from 旧表` 把数据复制过去(顺便可以加工数据,比如生成默认值);
3. drop table 删掉旧表;
4. 用 `alter table 新表 rename to 旧表名` 让新表"顶替"旧表的名字。

真实项目里迁移前务必备份,并且通常把整个迁移包在事务里,保证失败时能整体回滚。

## 示例

演示一次迷你迁移:旧表 goods_old 只有 id 和 title 两列,业务升级要求增加 price 列。goods_old 当前数据:

| id | title |
| ---- | ---- |
| 1 | 机械键盘 |
| 2 | 鼠标 |

按迁移四步走:

```sql
-- 1. 按新结构建新表
create table goods_new (
    id integer not null primary key,
    title varchar(256) not null,
    price real default 0
);
-- 2. 复制数据(新列用默认值填充)
insert into goods_new (id, title, price)
select id, title, 0 from goods_old;
-- 3. 删除旧表
drop table goods_old;
-- 4. 新表顶替旧表名
alter table goods_new rename to goods_old;
select * from goods_old;
```

查询结果:

| id | title | price |
| ---- | ---- | ---- |
| 1 | 机械键盘 | 0 |
| 2 | 鼠标 | 0 |

数据原封不动地搬到了新结构里,还多了一列 price。真实项目中迁移前要先备份,并建议用事务包裹整个流程。

## 题目

学校邮箱系统上线,需要给 student 表增加 email 列,旧数据按"姓名@school.com"规则补齐。请编写 SQL 按迁移流程完成:

1. 创建新表 student_new:结构为 student 原有 6 列(id 仍为主键,但这次**不要** autoincrement)+ 新增 email 列(varchar(256),可为空);
2. 把 student 的 10 行数据复制到 student_new,email 用 `name || '@school.com'` 生成(|| 是 SQLite 的字符串连接符);
3. 删除旧表 student;
4. 把 student_new 重命名为 student;
5. 通过 `select * from student` 查询验证(10 行,每人都有一个邮箱)。
