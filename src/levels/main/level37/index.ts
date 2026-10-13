import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level37",
  title: "数据操作 - 删除数据 - 清空表数据",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from temp_student;",
  answer:
    "delete from temp_student;\nselect count(*) as remain from temp_student;",
  hint: "不带 where 条件的 delete from 表名 会删除所有行;不要使用 drop table,最后用 select count(*) as remain from temp_student 查询剩余条数,应为 0",
  type: "main",
  difficulty: 1,
} as LevelType;
