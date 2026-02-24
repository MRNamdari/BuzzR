import { index, pgTable } from "drizzle-orm/pg-core";
import { returns } from "./returns";
import { orderItems } from "./order-items";

export const returnItems = pgTable(
  "return_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    returnId: t
      .bigint("return_id", { mode: "number" })
      .references(() => returns.id, { onDelete: "cascade" })
      .notNull(),
    orderItemId: t
      .bigint("order_item_id", { mode: "number" })
      .references(() => orderItems.id, { onDelete: "cascade" })
      .notNull(),
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
  ],
);
