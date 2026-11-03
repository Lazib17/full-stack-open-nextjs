import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local before running Drizzle Kit.",
  );
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Neon migrations need a direct connection. The app itself uses the pooled DATABASE_URL.
    url: process.env.DATABASE_URL_UNPOOLED ?? databaseUrl,
  },
});
