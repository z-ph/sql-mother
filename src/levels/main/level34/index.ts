import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level34",
  title: "数据操作 - 更新数据 - 基础更新",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "update student set score = 90 where name = '鸡哥';\nselect * from student;",
  hint: "update 表名 set 列名 = 新值 where 条件; 注意 where 条件定位到 鸡哥,最后查询全表验证",
  type: "main",
  difficulty: 1,
} as LevelType;
