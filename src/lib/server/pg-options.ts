import type postgres from "postgres";

/** يستخرج اسم المضيف من `DATABASE_URL` (يشمل postgres:// وpostgresql:// وIPv6). */
export function postgresHostnameFromDatabaseUrl(databaseUrl: string): string | null {
  const u = databaseUrl.trim();
  if (!u) return null;
  try {
    const hostname = new URL(
      u.replace(/^postgres(?:ql)?:/i, "http:"),
    ).hostname.replace(/^\[|\]$/g, "");
    return hostname || null;
  } catch {
    return null;
  }
}

/** Postgres على شبكة Railway الخاصة بدون TLS. لا تستخدم نمط "*.internal" العام لتجنّب أخطاء عند خوادم تتطلّب TLS. */
function isLikelyPlaintextPgHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h.endsWith(".railway.internal") ||
    h === "localhost" ||
    h === "127.0.0.1"
  );
}

/** مزامن منطقيًا مع `scripts/run-migrate.mjs` عند التعديل. */
export function getPostgresJsClientOptions(
  max: number,
  databaseUrl?: string,
): postgres.Options<{}> {
  const url = (databaseUrl ?? process.env.DATABASE_URL)?.trim() ?? "";
  const disable =
    process.env.DATABASE_SSL_DISABLE === "1" ||
    process.env.PGSSLMODE === "disable";
  const connectTimeout = Number(process.env.PGCONNECT_TIMEOUT ?? 25);
  const base = {
    max,
    connect_timeout: connectTimeout,
    idle_timeout: 20 as number | undefined,
  };

  let ssl: false | { rejectUnauthorized: boolean } = false;
  const host = postgresHostnameFromDatabaseUrl(url);
  if (disable) ssl = false;
  else if (process.env.NODE_ENV !== "production") ssl = false;
  else if (host && isLikelyPlaintextPgHost(host)) ssl = false;
  // إنتاج + مضيف عام: TLS مع شهادات المنصّات المدارة (Railway/Neon وغيرها).
  else ssl = { rejectUnauthorized: false };

  return { ...base, ssl };
}
