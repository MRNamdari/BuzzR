import { defineEntity, p } from "@mikro-orm/core";
import { AttributeValues } from "./AttributeValues";
import { Attributes } from "./Attributes";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { BaseEntity } from "./Base";

const ProductAttributeValuesSchema = defineEntity({
  name: "product_attribute_values",
  extends: BaseEntity,
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable()
        .index("idx_pav_product_id"),
    variation: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable()
        .index("idx_pav_variation_id"),
    attribute: () =>
      p
        .manyToOne(Attributes)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_pav_attribute_id"),
    attributeValue: () =>
      p
        .manyToOne(AttributeValues)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
  },
});

export class ProductAttributeValues
  extends ProductAttributeValuesSchema.class {}

ProductAttributeValuesSchema.setClass(ProductAttributeValues);
