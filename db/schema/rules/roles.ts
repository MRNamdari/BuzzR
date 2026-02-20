import { bigserial, pgTable } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
});
