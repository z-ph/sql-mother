import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level33",
  title: "数据操作 - 插入数据 - 插入查询结果",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student_archive;",
  answer:
    "insert into student_archive select * from student where score >= 400;\nselect * from student_archive;",
  hint: "insert into 目标表 select ... from 来源表 where 条件; 注意两表结构一致,最后查询 student_archive 验证",
  type: "main",
  difficulty: 2,
} as LevelType;
