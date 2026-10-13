import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level31",
  title: "数据操作 - 插入数据 - 基础插入",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "insert into student (name, age, class_id, score, exam_num) values ('阿珍', 21, 5, 88, 1);\nselect * from student;",
  hint: "使用 insert into 表名 (列名...) values (值...); 自增 id 无需指定,最后通过 select * from student 查询验证",
  type: "main",
  difficulty: 1,
} as LevelType;
