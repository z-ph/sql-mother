import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level43",
  title: "表结构 - 创建表",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "create table teacher (\n    id integer not null primary key autoincrement,\n    name varchar(256) not null,\n    age int,\n    subject varchar(64) not null,\n    work_years int default 0\n);\ninsert into teacher (name, age, subject, work_years) values ('张老师', 35, '数学', 8);\ninsert into teacher (name, age, subject, work_years) values ('李老师', 28, '英语', 3);\nselect * from teacher;",
  hint: "create table 表名 (列名 类型 约束, ...); 常见约束:not null、default、primary key、autoincrement",
  type: "main",
  difficulty: 1,
} as LevelType;
