/**
 * DML 关卡答案验证脚本
 * 对每个新增关卡:在全新数据库上执行 建表 SQL + 答案 SQL,
 * 校验结果行数与预期一致,且两次独立执行结果完全一致(确定性)。
 *
 * 运行:node scripts/verify-dml-levels.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const levelsRoot = join(__dirname, "../src/levels/main");

// [关卡目录名, 预期结果行数]
const cases = [
  ["level31", 11],
  ["level32", 12],
  ["level33", 4],
  ["level34", 10],
  ["level35", 10],
  ["level36", 8],
  ["level37", 0],
  ["level38", 9],
  ["level39", 10],
  ["level40", 10],
  ["level41", 12],
  ["level42", 10],
];

const SQL = await initSqlJs();

const runAnswer = (initSQL, answer) => {
  const db = new SQL.Database();
  try {
    db.run(initSQL);
    return db.exec(answer);
  } finally {
    db.close();
  }
};

let failed = 0;
for (const [levelDir, expectedRows] of cases) {
  const dir = join(levelsRoot, levelDir);
  let initSQL;
  let answer;
  try {
    initSQL = readFileSync(join(dir, "createTable.sql"), "utf-8");
    const indexTs = readFileSync(join(dir, "index.ts"), "utf-8");
    const match = indexTs.match(/answer:\s*"([^"]*)"/s);
    if (!match) {
      throw new Error("index.ts 中未找到 answer 字段(注意:answer 字符串内不能使用双引号)");
    }
    answer = match[1].replace(/\\n/g, "\n");
  } catch (error) {
    failed++;
    console.error(`❌ ${levelDir}: 读取失败 - ${error.message}`);
    continue;
  }
  try {
    const first = runAnswer(initSQL, answer);
    const second = runAnswer(initSQL, answer);
    const actualRows = first[0]?.values?.length ?? -1;
    if (JSON.stringify(first) !== JSON.stringify(second)) {
      failed++;
      console.error(`❌ ${levelDir}: 两次独立执行结果不一致(结果不确定)`);
    } else if (actualRows !== expectedRows) {
      failed++;
      console.error(`❌ ${levelDir}: 预期 ${expectedRows} 行,实际 ${actualRows} 行`);
    } else {
      console.log(`✅ ${levelDir}: ${actualRows} 行,校验通过`);
    }
  } catch (error) {
    failed++;
    console.error(`❌ ${levelDir}: 执行答案出错 - ${error.message}`);
  }
}

if (failed > 0) {
  console.error(`\n共 ${failed} 个关卡校验失败`);
  process.exit(1);
}
console.log("\n全部 DML 关卡校验通过");
