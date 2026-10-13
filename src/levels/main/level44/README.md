# 表结构 - 修改表结构

## 教程

表创建之后,需求经常会变:要加一列、删一列、改列名……这些用 alter table 语句完成。常见的几种:

```sql
alter table 表名 add column 列名 数据类型;        -- 增加列
alter table 表名 drop column 列名;                -- 删除列(SQLite 3.35+)
alter table 表名 rename column 旧列名 to 新列名;   -- 重命名列
alter table 旧表名 rename to 新表名;              -- 重命名表
```

两个注意点:

1. SQLite **不支持**直接修改已有列的数据类型或约束(比如把 int 改成 varchar)。想改?就得用"重建表"的迁移流程——下一关专门练;
2. 新加的列对已有数据默认取 null,通常需要配合 update 回填数据。

## 示例

演示给一张商品表加列并回填(与题目无关):

```sql
alter table goods add column stock int default 0;
update goods set stock = 100 where id = 1;
alter table goods rename column price to price_yuan;
select * from goods;
```

可以看到新列出现、旧数据被回填、列名也换好了。

## 题目

上一关创建的 teacher 表需要升级,请编写 SQL 完成以下操作:

1. 给 teacher 表增加一列 email,类型 varchar(256);
2. 给两位老师设置邮箱:张老师 → zhang@school.com,李老师 → li@school.com;
3. 把 age 列改名为 age_years(工龄信息更直观);
4. 通过 `select * from teacher` 查询验证(注意列的顺序和名称)。
