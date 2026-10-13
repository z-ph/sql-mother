import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level35",
  title: "数据操作 - 更新数据 - 多列与表达式更新",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "update student set exam_num = exam_num + 1, score = score + 10 where class_id = 4;\nselect * from student;",
  hint: "set 多个列用逗号分隔;新值可以是表达式(如 score = score + 10),最后查询全表验证",
  type: "main",
  difficulty: 2,
} as LevelType;
