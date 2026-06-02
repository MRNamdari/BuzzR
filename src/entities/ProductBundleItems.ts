import { defineEntity, p } from "@mikro-orm/core";
import { ProductBundles } from "./ProductBundles";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { BaseEntity } from "./Base";

const ProductBundleItemsSchema = defineEntity({
  name: "product_bundle_items",
  extends: BaseEntity,
  properties: {
    bundle: () =>
      p
        .manyToOne(ProductBundles)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_bundle_items_bundle_id"),
    product: () =>
      p.manyToOne(Products).ref().updateRule("no action").deleteRule("cascade"),
    variant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
    quantity: p.integer(),
  },
});

export class ProductBundleItems extends ProductBundleItemsSchema.class {}

ProductBundleItemsSchema.setClass(ProductBundleItems);
