import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { carts } from "./carts";
import { products, productVariants } from "../schema";

export const cartItems = pgTable(
  "cart_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey(),
    cartId: t
      .bigint("cart_id", { mode: "number" })
      .references(() => carts.id, { onDelete: "cascade" })
      .notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    variantId: t.bigint("variant_id", { mode: "number" }),
    quantity: t.integer("quantity").notNull().default(1),
    unitPrice: t.numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_cart_items_cart").on(table.cartId),
    index("idx_cart_items_product").on(table.productId),
    foreignKey({
      columns: [table.cartId],
      foreignColumns: [carts.id],
      name: "fk_cart_items_card",
    }),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_cart_items_product",
    }).onDelete("restrict"),
    foreignKey({
      columns: [table.variantId],
      foreignColumns: [productVariants.id],
      name: "fk_cart_items_variant",
    }).onDelete("restrict"),
  ],
);
