import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./db/schema/schema.ts",

  dbCredentials: {
    host: process.env.PG_HOST!,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER!,
    password: process.env.PG_PASS!,
    database: process.env.PG_NAME!,
    ssl: false,
  },

  schemaFilter: "public",
  tablesFilter: "*",

  migrations: {
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
