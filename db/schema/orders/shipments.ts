import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const shipments = pgTable(
  "shipments",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    orderId: t.bigint("order_id", { mode: "number" }).notNull(),
    carrier: t.varchar({ length: 100 }),
    trackingNumber: t.varchar("tracking_number", { length: 255 }),
    status: t.varchar({ length: 20 }).notNull(),
    shippedAt: t.timestamp("shipped_at", {
      withTimezone: true,
      mode: "string",
    }),
    deliveredAt: t.timestamp("delivered_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_shipments_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_order_id",
    }).onDelete("cascade"),
  ],
);
