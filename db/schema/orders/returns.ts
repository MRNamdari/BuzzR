import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const returns = pgTable(
  "returns",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    orderId: t
      .bigint("order_id", { mode: "number" })
      .references(() => orders.id, { onDelete: "cascade" })
      .notNull(),
    status: t.varchar({ length: 20 }).notNull(),
    reason: t.text(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_returns_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
