#!/usr/bin/env node
/**
 * خطّة تشغيل الإنتاج: تمرّر المنفذ صراحةً إلى srvx (بديل منطقي لـ app.listen مع TanStack Start).
 */
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

import { loadEnvLocal } from "./load-env-local.mjs";
loadEnvLocal();

/** معادلة مطابقة لتعليمات النشر؛ الاستماع الفعلي عبر srvx وليس Express `app.listen`. */
const port = process.env.PORT || 3000;
console.log(`Server running on port ${port}`);

const srvxEntry = path.join(process.cwd(), "node_modules/srvx/bin/srvx.mjs");
const args = [
  srvxEntry,
  "serve",
  "--prod",
  "--host",
  "0.0.0.0",
  "--port",
  String(port),
  "--dir",
  ".",
  "--static",
  "dist/client",
  "--entry",
  "dist/server/server.js",
];

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
