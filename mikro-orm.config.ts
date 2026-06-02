import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });
export default defineConfig({
  entities: ["./dist/entities"], // or ts path in dev
  entitiesTs: ["./src/entities"],
  dbName: process.env.PG_NAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 5432),
  extensions: [Migrator],
  migrations: {
    path: "./migrations",
    pathTs: "./src/migrations",
  },
});
