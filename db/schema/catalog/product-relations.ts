import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productRelations = pgTable(
  "product_relations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    relatedProductId: t
      .bigint("related_product_id", {
        mode: "number",
      })
      .notNull(),
    relationType: t.varchar("relation_type", { length: 20 }).notNull(),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    index("idx_product_relations_product").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_relations_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.relatedProductId],
      foreignColumns: [products.id],
      name: "fk_product_relations_related",
    }).onDelete("cascade"),
    unique(
      "product_relations_product_id_related_product_id_relation_ty_key",
    ).on(table.productId, table.relatedProductId, table.relationType),
  ],
);
