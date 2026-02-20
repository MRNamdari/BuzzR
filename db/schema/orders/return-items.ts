import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { returns } from "./returns";
import { orderItems } from "./order-items";

export const returnItems = pgTable(
  "return_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    returnId: t.bigint("return_id", { mode: "number" }).notNull(),
    orderItemId: t.bigint("order_item_id", { mode: "number" }).notNull(),
    quantity: t.integer().notNull(),
    condition: t.varchar({ length: 50 }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_return_items_return_id").using(
      "btree",
      table.returnId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.returnId],
      foreignColumns: [returns.id],
      name: "fk_return_items_return",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_return_items_order_item",
    }).onDelete("cascade"),
  ],
);
