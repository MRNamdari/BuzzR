import { index, pgTable } from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
import { shipments } from "./shipments";

export const shipmentItems = pgTable(
  "shipment_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    shipmentId: t
      .bigint("shipment_id", { mode: "number" })
      .references(() => shipments.id, { onDelete: "cascade" })
      .notNull(),
    orderItemId: t
      .bigint("order_item_id", { mode: "number" })
      .references(() => orderItems.id, { onDelete: "cascade" })
      .notNull(),
    quantity: t.integer().notNull(),
  }),
  (table) => [
    index("idx_shipment_items_shipment_id").using(
      "btree",
      table.shipmentId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
