import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orderItems } from "./order-items";
import { shipments } from "./shipments";

export const shipmentItems = pgTable(
  "shipment_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    shipmentId: t.bigint("shipment_id", { mode: "number" }).notNull(),
    orderItemId: t.bigint("order_item_id", { mode: "number" }).notNull(),
    quantity: t.integer().notNull(),
  }),
  (table) => [
    index("idx_shipment_items_shipment_id").using(
      "btree",
      table.shipmentId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_order_item_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.shipmentId],
      foreignColumns: [shipments.id],
      name: "fk_shipment_id",
    }).onDelete("cascade"),
  ],
);
