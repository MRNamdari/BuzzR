import { pgTable, unique } from "drizzle-orm/pg-core";

export const attributes = pgTable(
  "attributes",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    type: t.varchar({ length: 20 }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [unique("attributes_code_key").on(table.code)],
);
