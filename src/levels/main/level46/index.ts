import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level46",
  title: "表结构 - 综合实战",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "create table course (\n    id integer not null primary key autoincrement,\n    name varchar(64) not null unique,\n    credit real not null check(credit > 0),\n    teacher varchar(256)\n);\ninsert into course (name, credit, teacher) values ('数据库', 3.5, '鱼皮');\ninsert into course (name, credit, teacher) values ('操作系统', 4, '老李');\ninsert into course (name, credit, teacher) values ('编译原理', 3, '赵派森');\nalter table course add column location varchar(128);\nupdate course set location = '机房A' where name = '数据库';\nupdate course set location = '教学楼301' where name = '操作系统';\nselect * from course;",
  hint: "unique 保证不重复,check(条件)保证取值合法;建表->插入->加列->回填->查询,一步都不能少",
  type: "main",
  difficulty: 2,
} as LevelType;
