import { defineEntity, p } from "@mikro-orm/core";
import { ProductBundleItems } from "./ProductBundleItems";
import { BaseEntity } from "./Base";

const ProductBundlesSchema = defineEntity({
  name: "product_bundles",
  extends: BaseEntity,
  properties: {
    isDynamic: p.boolean(),
    productBundleItemsCollection: () =>
      p.oneToMany(ProductBundleItems).mappedBy("bundle"),
  },
});

export class ProductBundles extends ProductBundlesSchema.class {}

ProductBundlesSchema.setClass(ProductBundles);
