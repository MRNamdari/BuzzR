import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const campaigns = pgTable(
  "campaigns",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    description: t.text(),
    startsAt: t.timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: t.timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: t.boolean("is_active").default(true).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_campaigns_active_time").on(
      table.isActive,
      table.startsAt,
      table.endsAt,
    ),
    unique("campaigns_code_key").on(table.code),
  ],
);
