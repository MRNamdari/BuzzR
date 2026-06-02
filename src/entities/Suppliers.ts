import { defineEntity, p } from "@mikro-orm/core";
import { ProductPurchasePrices } from "./ProductPurchasePrices";
import { BaseEntity } from "./Base";

const SuppliersSchema = defineEntity({
  name: "suppliers",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    contactInfo: p.json().nullable(),
    productPurchasePricesCollection: () =>
      p.oneToMany(ProductPurchasePrices).mappedBy("supplier"),
  },
});

export class Suppliers extends SuppliersSchema.class {}

SuppliersSchema.setClass(Suppliers);
