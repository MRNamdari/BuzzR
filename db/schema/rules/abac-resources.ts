import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const abacResources = pgTable(
  "abac_resources",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_abac_resources_code").using(
      "btree",
      table.code.asc().nullsLast().op("text_ops"),
    ),
    unique("abac_resources_code_key").on(table.code),
  ],
);
