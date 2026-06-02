import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Currency } from "./TCurrency";
import { BaseEntity } from "./Base";

const ProductPriceHistorySchema = defineEntity({
  name: "product_price_history",
  extends: BaseEntity,
  indexes: [
    { name: "idx_pph_valid_from_to", properties: ["validFrom", "validTo"] },
    { name: "idx_pph_variation_currency", properties: ["product", "currency"] },
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
    currency: p.enum(() => Currency).nativeEnumName("currency"),
    amount: p.decimal(),
    validFrom: p.datetime().defaultRaw(`now()`),
    validTo: p.datetime().nullable(),
  },
});

export class ProductPriceHistory extends ProductPriceHistorySchema.class {}

ProductPriceHistorySchema.setClass(ProductPriceHistory);
