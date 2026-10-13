import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level40",
  title: "数据操作 - 事务 - 事务回滚",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "begin;\nupdate student set score = score - 500 where name = '鸡哥';\nupdate student set score = score + 500 where name = '热dog';\nrollback;\nselect * from student;",
  hint: "rollback; 会撤销本次事务里的所有修改,让数据回到 begin 之前的状态",
  type: "main",
  difficulty: 1,
} as LevelType;
