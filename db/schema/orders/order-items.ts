import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "../catalog/product-variants";
import { products } from "../catalog/products";
import { orders } from "./orders";

export const orderItems = pgTable(
  "order_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    orderId: t.bigint("order_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    variantId: t.bigint("variant_id", { mode: "number" }),
    quantity: t.integer().notNull(),
    unitPrice: t.numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
    purchasePrice: t.numeric("purchase_price", { precision: 10, scale: 2 }),
    taxAmount: t
      .numeric("tax_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    discountAmount: t
      .numeric("discount_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    totalPrice: t.numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    descritpion: t.varchar("description", { length: 2000 }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_order_items_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_order_items_order",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_order_items_product",
    }),
    foreignKey({
      columns: [table.variantId],
      foreignColumns: [productVariants.id],
      name: "fk_order_items_variant",
    }),
  ],
);
