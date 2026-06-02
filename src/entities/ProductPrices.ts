import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Currency } from "./TCurrency";
import { BaseEntity } from "./Base";

const ProductPricesSchema = defineEntity({
  name: "product_prices",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_product_prices_variation_currency",
      properties: ["product", "currency"],
    },
  ],
  uniques: [
    {
      name: "product_prices_variation_id_currency_key",
      properties: ["currency", "product", "variant"],
    },
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
    currency: p
      .enum(() => Currency)
      .nativeEnumName("currency")
      .nullable(),
    amount: p.decimal(),
  },
});

export class ProductPrices extends ProductPricesSchema.class {}

ProductPricesSchema.setClass(ProductPrices);
