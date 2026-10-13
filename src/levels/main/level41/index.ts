import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level41",
  title: "数据操作 - 事务 - 保存点",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "begin;\ninsert into student (name, age, class_id, score, exam_num) values ('大聪明', 30, 2, 555, 2);\nsavepoint sp1;\ninsert into student (name, age, class_id, score, exam_num) values ('小机灵', 21, 1, 444, 1);\nsavepoint sp2;\ninsert into student (name, age, class_id, score, exam_num) values ('小迷糊', 19, 2, 199, 1);\nrollback to sp2;\ncommit;\nselect * from student;",
  hint: "savepoint 名; 设置保存点,rollback to 名; 只撤销该保存点之后的修改",
  type: "main",
  difficulty: 2,
} as LevelType;
