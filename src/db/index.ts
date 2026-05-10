import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { getPostgresJsClientOptions } from "@/lib/server/pg-options";

let client: ReturnType<typeof postgres> | null = null;
let instance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL غير معرّف. أضيفيه في Railway Variables أو في .env للتطوير المحلي.",
    );
  }
  if (!instance) {
    client = postgres(url, getPostgresJsClientOptions(10, url));
    instance = drizzle(client, { schema });
  }
  return instance;
}

export async function closeDb() {
  if (client) {
    await client.end();
    client = null;
    instance = null;
  }
}

export type Db = NonNullable<typeof instance>;
export { schema };
