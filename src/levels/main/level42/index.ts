import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level42",
  title: "数据操作 - 事务与并发 - 综合练习",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "begin;\ninsert into student (name, age, class_id, score, exam_num) values ('事务小子', 26, 3, 333, 3);\nupdate student set score = 220 where name = '李阿巴';\ndelete from student where score < 1;\ncommit;\nselect * from student;",
  hint: "用 begin; ... commit; 把增、改、删包成一个原子单元,最后查询全表验证",
  type: "main",
  difficulty: 2,
} as LevelType;
