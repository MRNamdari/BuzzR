import { index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { products } from "./products";
import { attributeValues } from "./attribute-values";
import { attributes } from "./attributes";

export const productAttributeValues = pgTable(
  "product_attribute_values",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" }),
    variationId: t
      .bigint("variation_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    attributeId: t
      .bigint("attribute_id", { mode: "number" })
      .references(() => attributes.id, { onDelete: "cascade" })
      .notNull(),
    attributeValueId: t
      .bigint("attribute_value_id", {
        mode: "number",
      })
      .references(() => attributeValues.id, { onDelete: "cascade" })
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
  ],
);
