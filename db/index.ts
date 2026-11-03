import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function readDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local for local development.",
    );
  }

  return url;
}

export const db = drizzle({ client: neon(readDatabaseUrl()), schema });
