import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const userTiers = pgTable(
  "user_tiers",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 50 }).notNull(),
    priority: t.integer().notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_user_tiers_priority").using(
      "btree",
      table.priority.asc().nullsLast().op("int4_ops"),
    ),
    unique("user_tiers_code_key").on(table.code),
  ],
);
