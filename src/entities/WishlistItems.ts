import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Wishlists } from "./Wishlists";
import { BaseEntity } from "./Base";

const WishlistItemsSchema = defineEntity({
  name: "wishlist_items",
  extends: BaseEntity,
  uniques: [
    {
      name: "wishlist_items_wishlist_id_product_id_variant_id_key",
      properties: ["product", "variation", "wishlist"],
    },
  ],
  properties: {
    wishlist: () =>
      p
        .manyToOne(Wishlists)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_wishlist_items_wishlist_id"),
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("no action"),
    variation: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("no action")
        .nullable(),
  },
});

export class WishlistItems extends WishlistItemsSchema.class {}

WishlistItemsSchema.setClass(WishlistItems);
