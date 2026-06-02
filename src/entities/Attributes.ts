import { defineEntity, p } from "@mikro-orm/core";
import { AttributeValues } from "./AttributeValues";
import { ProductAttributeValues } from "./ProductAttributeValues";
import { AttributeType } from "./TAttributeType";
import { BaseEntity } from "./Base";

const AttributesSchema = defineEntity({
  name: "attributes",
  extends: BaseEntity,
  properties: {
    code: p.string().length(100).unique("attributes_code_key"),
    name: p.string().length(100),
    type: p.enum(() => AttributeType).nativeEnumName("attribute_type"),
    attributeValuesCollection: () =>
      p.oneToMany(AttributeValues).mappedBy("attribute"),
    productAttributeValuesCollection: () =>
      p.oneToMany(ProductAttributeValues).mappedBy("attribute"),
  },
});

export class Attributes extends AttributesSchema.class {}

AttributesSchema.setClass(Attributes);
