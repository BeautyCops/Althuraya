import type postgres from "postgres";

/** مزامن منطقيًا مع `scripts/run-migrate.mjs` عند التعديل. */
export function getPostgresJsClientOptions(max: number): postgres.Options<{}> {
  const disable =
    process.env.DATABASE_SSL_DISABLE === "1" ||
    process.env.PGSSLMODE === "disable";
  const connectTimeout = Number(process.env.PGCONNECT_TIMEOUT ?? 25);
  const base = {
    max,
    connect_timeout: connectTimeout,
    idle_timeout: 20 as number | undefined,
  };
  if (disable) return { ...base, ssl: false };
  if (process.env.NODE_ENV !== "production") return { ...base, ssl: false };
  return { ...base, ssl: "require" };
}
