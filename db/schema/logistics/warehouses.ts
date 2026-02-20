import { pgTable } from "drizzle-orm/pg-core";

export const warehouses = pgTable("warehouses", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  location: t.jsonb(),
  createdAt: t
    .timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
}));
