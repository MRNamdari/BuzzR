import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { productBundles } from "./product-bundles";
import { productVariants } from "./product-variants";
import { products } from "./products";

export const productBundleItems = pgTable(
  "product_bundle_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    bundleId: t.bigint("bundle_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    variationId: t.bigint("variation_id", { mode: "number" }),
    quantity: t.integer().default(1).notNull(),
  }),
  (table) => [
    index("idx_product_bundle_items_bundle_id").using(
      "btree",
      table.bundleId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.bundleId],
      foreignColumns: [productBundles.id],
      name: "fk_bundle_items_bundle",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_bundle_items_product",
    }),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_bundle_items_variant",
    }),
  ],
);
