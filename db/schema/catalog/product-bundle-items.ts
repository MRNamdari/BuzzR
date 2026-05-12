import { index, pgTable } from "drizzle-orm/pg-core";
import { productBundles } from "./product-bundles";
import { productVariants } from "./product-variants";
import { products } from "./products";

export const productBundleItems = pgTable(
  "product_bundle_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    bundleId: t
      .bigint("bundle_id", { mode: "number" })
      .notNull()
      .references(() => productBundles.id, { onDelete: "cascade" }),
    productId: t
      .bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    variantId: t
      .bigint("variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: t.integer().default(1).notNull(),
  }),
  (table) => [
    index("idx_product_bundle_items_bundle_id").using(
      "btree",
      table.bundleId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
