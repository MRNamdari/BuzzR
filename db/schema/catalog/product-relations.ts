import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productRelations = pgTable(
  "product_relations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    relatedProductId: t
      .bigint("related_product_id", {
        mode: "number",
      })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    relationType: t.varchar("relation_type", { length: 20 }).notNull(),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    index("idx_product_relations_product").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    unique(
      "product_relations_product_id_related_product_id_relation_ty_key",
    ).on(table.productId, table.relatedProductId, table.relationType),
  ],
);
