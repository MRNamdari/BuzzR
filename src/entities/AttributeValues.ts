import { defineEntity, p } from "@mikro-orm/core";
import { Attributes } from "./Attributes";
import { ProductAttributeValues } from "./ProductAttributeValues";
import { BaseEntity } from "./Base";

const AttributeValuesSchema = defineEntity({
  name: "attribute_values",
  uniques: [
    {
      name: "attribute_values_attribute_id_value_key",
      properties: ["attribute", "value"],
    },
  ],
  extends: BaseEntity,
  properties: {
    attribute: () =>
      p
        .manyToOne(Attributes)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_attribute_values_attribute_id"),
    value: p.string(),
    sortOrder: p.integer(),
    productAttributeValuesCollection: () =>
      p.oneToMany(ProductAttributeValues).mappedBy("attributeValue"),
  },
});

export class AttributeValues extends AttributeValuesSchema.class {}

AttributeValuesSchema.setClass(AttributeValues);
