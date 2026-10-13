import { test, expect } from "playwright/test";

const BASE = "http://localhost:5173";

test("主线关卡列表包含新增的 16 个关卡", async ({ page }) => {
  await page.goto(BASE + "/#/levels");
  await expect(page.locator(".main-level")).toHaveCount(46);
  await expect(page.getByText("数据操作 - 插入数据 - 基础插入")).toBeVisible();
  await expect(page.getByText("数据操作 - 增删改综合练习")).toBeVisible();
  await expect(page.getByText("数据操作 - 事务与并发 - 综合练习")).toBeVisible();
  await expect(page.getByText("表结构 - 表数据迁移")).toBeVisible();
});

test("level31:默认查询判错,提交答案后判对", async ({ page }) => {
  await page.goto(BASE + "/#/learn/level31");
  await expect(page.locator("#sqlResult")).toContainText("❌ 错误");
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(
    "insert into student (name, age, class_id, score, exam_num) values ('阿珍', 21, 5, 88, 1);"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type("select * from student;");
  await page.getByRole("button", { name: /运\s*行/ }).click();
  await expect(page.locator("#sqlResult")).toContainText("✅ 正确", {
    timeout: 15000,
  });
});

test("level38:增删改综合题提交答案后判对", async ({ page }) => {
  await page.goto(BASE + "/#/learn/level38");
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(
    "insert into student (name, age, class_id, score, exam_num) values ('大聪明', 30, 2, 555, 2);"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type(
    "update student set score = 666 where name = '鱼皮';"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type("delete from student where exam_num < 2;");
  await page.keyboard.press("Enter");
  await page.keyboard.type("select * from student;");
  await page.getByRole("button", { name: /运\s*行/ }).click();
  await expect(page.locator("#sqlResult")).toContainText("✅ 正确", {
    timeout: 15000,
  });
});

test("level40:事务回滚提交答案后判对(数据保持初始状态)", async ({ page }) => {
  await page.goto(BASE + "/#/learn/level40");
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type("begin;");
  await page.keyboard.press("Enter");
  await page.keyboard.type(
    "update student set score = score - 500 where name = '鸡哥';"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type(
    "update student set score = score + 500 where name = '热dog';"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type("rollback;");
  await page.keyboard.press("Enter");
  await page.keyboard.type("select * from student;");
  await page.getByRole("button", { name: /运\s*行/ }).click();
  await expect(page.locator("#sqlResult")).toContainText("✅ 正确", {
    timeout: 15000,
  });
});

test("level45:表迁移题提交答案后判对", async ({ page }) => {
  await page.goto(BASE + "/#/learn/level45");
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(
    "create table student_new (id integer not null primary key, name varchar(256) not null, age int null, class_id bigint not null, score double default 0 null, exam_num int default 0 null, email varchar(256) null);"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type(
    "insert into student_new (id, name, age, class_id, score, exam_num, email) select id, name, age, class_id, score, exam_num, name || '@school.com' from student;"
  );
  await page.keyboard.press("Enter");
  await page.keyboard.type("drop table student;");
  await page.keyboard.press("Enter");
  await page.keyboard.type("alter table student_new rename to student;");
  await page.keyboard.press("Enter");
  await page.keyboard.type("select * from student;");
  await page.getByRole("button", { name: /运\s*行/ }).click();
  await expect(page.locator("#sqlResult")).toContainText("✅ 正确", {
    timeout: 15000,
  });
});

test("回归:level1 默认查询判对", async ({ page }) => {
  await page.goto(BASE + "/#/learn/level1");
  await expect(page.locator("#sqlResult")).toContainText("✅ 正确", {
    timeout: 15000,
  });
});
