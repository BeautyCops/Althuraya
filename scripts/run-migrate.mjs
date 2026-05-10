import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

/** منطق مزامن مع `src/lib/server/pg-options.ts` */
function postgresClientOpts(max) {
  const disable =
    process.env.DATABASE_SSL_DISABLE === "1" ||
    process.env.PGSSLMODE === "disable";
  const connectTimeout = Number(process.env.PGCONNECT_TIMEOUT ?? 25);
  const base = { max, connect_timeout: connectTimeout };
  if (disable) return { ...base, ssl: false };
  if (process.env.NODE_ENV !== "production") return { ...base, ssl: false };
  return { ...base, ssl: "require" };
}

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  if (process.env.NODE_ENV === "production") {
    console.error("[migrate] DATABASE_URL مطلوب في الإنتاج.");
    process.exit(1);
  }
  console.warn(
    "[migrate] DATABASE_URL غير معرّف — تخطّي الترحيلات (تطوير محلي).",
  );
  process.exit(0);
}

const client = postgres(url, postgresClientOpts(1));
const db = drizzle(client);

try {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] اكتملت الترحيلات.");
} catch (e) {
  console.error("[migrate] فشل:", e);
  process.exit(1);
} finally {
  await client.end({ timeout: 10 });
}
