import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { ShippingMethods } from "./ShippingMethods";
import { BaseEntity } from "./Base";

const ProductShippingRulesSchema = defineEntity({
  name: "product_shipping_rules",
  extends: BaseEntity,
  properties: {
    product: () =>
      p.manyToOne(Products).ref().updateRule("no action").deleteRule("cascade"),
    productVariant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
    shippingMethod: () =>
      p.manyToOne(ShippingMethods).ref().updateRule("no action").nullable(),
    isExcluded: p.boolean(),
    extraFee: p.decimal().nullable(),
  },
});

export class ProductShippingRules extends ProductShippingRulesSchema.class {}

ProductShippingRulesSchema.setClass(ProductShippingRules);
