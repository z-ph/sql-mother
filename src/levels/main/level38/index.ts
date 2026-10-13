import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level38",
  title: "数据操作 - 增删改综合练习",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "insert into student (name, age, class_id, score, exam_num) values ('大聪明', 30, 2, 555, 2);\nupdate student set score = 666 where name = '鱼皮';\ndelete from student where exam_num < 2;\nselect * from student;",
  hint: "按顺序执行:插入大聪明 -> 更新鱼皮的 score -> 删除 exam_num 小于 2 的学生,最后查询全表验证",
  type: "main",
  difficulty: 2,
} as LevelType;
