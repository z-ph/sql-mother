# 表结构 - 综合实战

## 教程

最后一关把建表用到的约束一次讲透,再串一个完整流程。

前面学过的约束中,还有两个没实战过:

- unique:该列的值不允许重复,比如用户名、课程名;
- check(条件):插入/更新时检查条件,不满足直接报错,比如分数必须大于 0;

另外补充一个概念——外键(foreign key):在创建表时用 `references 主表(列)` 声明某列必须引用另一张表已存在的行,比如学生表的 class_id 引用班级表,防止出现"不存在的班级"。注意:SQLite 默认不开启外键检查(需要执行 `pragma foreign_keys = on`),本项目也未开启,所以外键只作了解即可。

## 示例

演示 unique 和 check 如何拦截非法数据(与题目无关):

```sql
create table demo_user (
    id integer not null primary key autoincrement,
    name varchar(64) not null unique
);
insert into demo_user (name) values ('鱼皮');
insert into demo_user (name) values ('鱼皮');
-- 报错:UNIQUE constraint failed: demo_user.name
```

第二条插入因为名字重复而被拒绝,这就是约束的价值:把数据合法性交给数据库兜底。

## 题目

学校要开排课系统,请编写 SQL 完成以下操作:

1. 创建 course 课程表,要求:
   - id:整数,非空,自增主键;
   - name:可变长字符串(64),非空,且**不允许重复**(unique);
   - credit:小数(real),非空,且必须**大于 0**(check 约束);
   - teacher:可变长字符串(256),表示授课老师;
2. 插入三门课:数据库(3.5 学分,鱼皮)、操作系统(4 学分,老李)、编译原理(3 学分,赵派森);
3. 给 course 表增加一列 location(varchar(128),上课地点);
4. 回填地点:数据库 → 机房A,操作系统 → 教学楼301(编译原理暂不安排,保持空值);
5. 通过 `select * from course` 查询验证。
