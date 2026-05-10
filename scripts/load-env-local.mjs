import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * تحميل `.env` من جذر المشروع (بدون اعتمادات إضافية).
 * يطبِّق المتغيرات من الملف؛ القيم المعرفة لاحقاً في `.env` تطغى على الأسطر السابقة.
 * يستبدِل المتغيرات الموجودة في `process.env` حتى تعمل المحليات حتى لو وُجدت متغيرات جهاز عامة خطأً.
 */
export function loadEnvLocal(rel = ".env") {
  const p = resolve(process.cwd(), rel);
  if (!existsSync(p)) return;

  const text = readFileSync(p, "utf8");
  for (let line of text.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key) continue;
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    )
      val = val.slice(1, -1);
    process.env[key] = val.replace(/\\n/g, "\n");
  }
}
