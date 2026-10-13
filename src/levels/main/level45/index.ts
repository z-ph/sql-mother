import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level45",
  title: "表结构 - 表数据迁移",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student;",
  answer:
    "create table student_new (\n    id integer not null primary key,\n    name varchar(256) not null,\n    age int null,\n    class_id bigint not null,\n    score double default 0 null,\n    exam_num int default 0 null,\n    email varchar(256) null\n);\ninsert into student_new (id, name, age, class_id, score, exam_num, email)\nselect id, name, age, class_id, score, exam_num, name || '@school.com' from student;\ndrop table student;\nalter table student_new rename to student;\nselect * from student;",
  hint: "迁移四步:create 新表 -> insert into ... select 复制数据 -> drop 旧表 -> rename 新表为旧表名",
  type: "main",
  difficulty: 2,
} as LevelType;
