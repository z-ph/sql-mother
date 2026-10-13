import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level39",
  title: "数据操作 - 事务 - 事务基础",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "begin;\nupdate student set score = score - 100 where name = '鱼皮';\nupdate student set score = score + 100 where name = '鸡哥';\ncommit;\nselect * from student;",
  hint: "begin; 开启事务,commit; 提交;两条 update 都写在 begin 和 commit 之间,最后查询全表验证",
  type: "main",
  difficulty: 1,
} as LevelType;
