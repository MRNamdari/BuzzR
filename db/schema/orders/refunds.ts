import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
import { payments } from "./payments";

export const refunds = pgTable(
  "refunds",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    paymentId: t.bigint("payment_id", { mode: "number" }).notNull(),
    orderItemId: t.bigint("order_item_id", { mode: "number" }),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    reason: t.text(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_refunds_order_item_id").using(
      "btree",
      table.orderItemId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_refunds_payment_id").using(
      "btree",
      table.paymentId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.paymentId],
      foreignColumns: [payments.id],
      name: "fk_refunds_payment",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_refunds_order_item",
    }).onDelete("set null"),
  ],
);
