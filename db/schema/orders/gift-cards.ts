import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const giftCards = pgTable(
  "gift_cards",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    initialBalance: t
      .numeric("initial_balance", {
        precision: 10,
        scale: 2,
      })
      .notNull(),
    currentBalance: t
      .numeric("current_balance", {
        precision: 10,
        scale: 2,
      })
      .notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    expiresAt: t.timestamp("expires_at", {
      withTimezone: true,
      mode: "string",
    }),
    status: t.varchar({ length: 20 }).default("active").notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_gift_cards_expires_at").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_gift_cards_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    unique("gift_cards_code_key").on(table.code),
  ],
);
