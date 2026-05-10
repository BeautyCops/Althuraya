/**
 * أنشئ `.env` من `.env.example` إذا لم يكن موجوداً — للتجهيز الأول فقط، بدون تمييع أسرار.
 */
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const target = resolve(root, ".env");
const example = resolve(root, ".env.example");

if (!existsSync(target) && existsSync(example)) {
  copyFileSync(example, target);
  console.log(
    "[env] تم إنشاء `.env` من `.env.example` — عدّلي القيم إن احتجت.",
  );
} else if (existsSync(target)) {
  console.log("[env] `.env` موجود مسبقاً — لم يُستبدَل.");
} else if (!existsSync(example)) {
  console.warn("[env] لم يوجد `.env.example`.");
}
