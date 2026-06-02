import { defineEntity, p } from "@mikro-orm/core";
import { Carts } from "./Carts";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { BaseEntity } from "./Base";
import { ProductBundles } from "./ProductBundles";

const CartItemsSchema = defineEntity({
  name: "cart_items",
  extends: BaseEntity,
  checks: [
    { expression: (cols) => `${cols.quantity} > 0` },
    { expression: (cols) => `${cols.unitPrice} >= 0` },
  ],
  properties: {
    cart: () =>
      p
        .manyToOne(Carts)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_cart_items_cart"),
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("restrict")
        .index("idx_cart_items_product"),
    variant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("restrict")
        .nullable(),
    bundle: () =>
      p
        .manyToOne(ProductBundles)
        .ref()
        .updateRule("no action")
        .deleteRule("restrict")
        .nullable(),
    quantity: p.integer(),
    unitPrice: p.decimal(),
  },
});

export class CartItems extends CartItemsSchema.class {}

CartItemsSchema.setClass(CartItems);
