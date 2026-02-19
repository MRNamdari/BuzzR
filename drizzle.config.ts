import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.PG_HOST!,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER!,
    password: process.env.PG_PASS!,
    database: process.env.PG_NAME!,
    ssl: false,
  },
});
