import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { products } from "./products";
import { attributeValues } from "./attribute-values";
import { attributes } from "./attributes";

export const productAttributeValues = pgTable(
  "product_attribute_values",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t.bigint("product_id", { mode: "number" }),
    variationId: t.bigint("variation_id", { mode: "number" }),
    attributeId: t.bigint("attribute_id", { mode: "number" }).notNull(),
    attributeValueId: t
      .bigint("attribute_value_id", {
        mode: "number",
      })
      .notNull(),
  }),
  (table) => [
    index("idx_pav_attribute_id").using(
      "btree",
      table.attributeId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_pav_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_pav_variation_id").using(
      "btree",
      table.variationId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_attribute_values_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_product_attribute_values_variant",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.attributeId],
      foreignColumns: [attributes.id],
      name: "fk_product_attribute_values_attribute",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.attributeValueId],
      foreignColumns: [attributeValues.id],
      name: "fk_product_attribute_values_attribute_value",
    }).onDelete("cascade"),
  ],
);
