import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level36",
  title: "数据操作 - 删除数据 - 条件删除",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "delete from student where score < 100;\nselect * from student;",
  hint: "delete from 表名 where 条件; 想想哪些同学分数小于 100,最后查询剩余学生验证",
  type: "main",
  difficulty: 1,
} as LevelType;
