import { defineEntity, p } from "@mikro-orm/core";
import { ProductShippingRules } from "./ProductShippingRules";
import { ShippingZones } from "./ShippingZones";
import { BaseEntity } from "./Base";

const ShippingMethodsSchema = defineEntity({
  name: "shipping_methods",
  extends: BaseEntity,
  properties: {
    zone: () =>
      p.manyToOne(ShippingZones).ref().updateRule("no action").nullable(),
    name: p.string(),
    code: p.string().length(100).unique("shipping_methods_code_key"),
    isActive: p.boolean(),
    basePrice: p.decimal(),
    pricePerKg: p.decimal(),
    minOrderTotal: p.decimal().nullable(),
    maxOrderTotal: p.decimal().nullable(),
    productShippingRulesCollection: () =>
      p.oneToMany(ProductShippingRules).mappedBy("shippingMethod"),
  },
});

export class ShippingMethods extends ShippingMethodsSchema.class {}

ShippingMethodsSchema.setClass(ShippingMethods);
