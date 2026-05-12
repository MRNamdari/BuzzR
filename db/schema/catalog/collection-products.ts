import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { collections } from "./collections";
import { products } from "./products";
import { productVariants } from "./product-variants";

export const collectionProducts = pgTable(
  "collection_products",
  (t) => ({
    collectionId: t
      .bigint("collection_id", { mode: "number" })
      .references(() => collections.id, { onDelete: "cascade" })
      .notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: t
      .bigint("product_variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    primaryKey({
      columns: [table.collectionId, table.productId],
      name: "collection_products_pkey",
    }),
  ],
);
