import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level44",
  title: "表结构 - 修改表结构",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from teacher;",
  answer:
    "alter table teacher add column email varchar(256);\nupdate teacher set email = 'zhang@school.com' where name = '张老师';\nupdate teacher set email = 'li@school.com' where name = '李老师';\nalter table teacher rename column age to age_years;\nselect * from teacher;",
  hint: "alter table 表名 add column 列名 类型; 改列名用 rename column 旧名 to 新名",
  type: "main",
  difficulty: 2,
} as LevelType;
