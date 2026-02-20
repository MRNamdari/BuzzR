import { foreignKey, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { collections } from "./collections";
import { products } from "./products";

export const collectionProducts = pgTable(
  "collection_products",
  (t) => ({
    collectionId: t.bigint("collection_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "fk_collection_products_collection",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_collection_products_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.collectionId, table.productId],
      name: "collection_products_pkey",
    }),
  ],
);
