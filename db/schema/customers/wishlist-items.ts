import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { productVariants } from "../catalog/product-variants";
import { products } from "../catalog/products";
import { wishlists } from "./wishlists";

export const wishlistItems = pgTable(
  "wishlist_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    wishlistId: t.bigint("wishlist_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    variationId: t.bigint("variation_id", { mode: "number" }),
    addedAt: t
      .timestamp("added_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_wishlist_items_wishlist_id").using(
      "btree",
      table.wishlistId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.wishlistId],
      foreignColumns: [wishlists.id],
      name: "fk_wishlist_items_wishlist",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_wishlist_items_product",
    }),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_wishlist_items_variation",
    }),
    unique("wishlist_items_wishlist_id_product_id_variant_id_key").on(
      table.productId,
      table.variationId,
      table.wishlistId,
    ),
  ],
);
