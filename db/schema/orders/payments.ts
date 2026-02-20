import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const payments = pgTable(
  "payments",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    orderId: t.bigint("order_id", { mode: "number" }).notNull(),
    provider: t.varchar({ length: 50 }).notNull(),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    status: t.varchar({ length: 20 }).notNull(),
    externalReference: t.varchar("external_reference", { length: 255 }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_payments_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_payments_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_payments_order",
    }).onDelete("cascade"),
  ],
);
