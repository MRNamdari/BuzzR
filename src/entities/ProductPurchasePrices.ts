import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Suppliers } from "./Suppliers";
import { BaseEntity } from "./Base";

const ProductPurchasePricesSchema = defineEntity({
  name: "product_purchase_prices",
  extends: BaseEntity,
  indexes: [
    { name: "idx_ppp_valid_from_to", properties: ["validFrom", "validTo"] },
    { name: "idx_ppp_variant_currency", properties: ["variant", "currency"] },
  ],
  properties: {
    product: () =>
      p.manyToOne(Products).ref().updateRule("no action").deleteRule("cascade"),
    variant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
    supplier: () =>
      p.manyToOne(Suppliers).ref().updateRule("no action").nullable(),
    currency: p.string().length(3),
    amount: p.decimal(),
    validFrom: p.datetime().defaultRaw(`now()`),
    validTo: p.datetime().nullable(),
  },
});

export class ProductPurchasePrices extends ProductPurchasePricesSchema.class {}

ProductPurchasePricesSchema.setClass(ProductPurchasePrices);
