import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level32",
  title: "数据操作 - 插入数据 - 批量插入",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "insert into student (name, age, class_id, score, exam_num) values ('阿强', 22, 5, 91.5, 2), ('小美', 20, 1, 76, 1);\nselect * from student;",
  hint: "values 后面用逗号分隔多组值,即可一条语句插入多行,最后通过 select * from student 查询验证",
  type: "main",
  difficulty: 1,
} as LevelType;
