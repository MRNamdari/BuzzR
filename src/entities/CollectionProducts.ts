import { defineEntity, p } from "@mikro-orm/core";
import { Collections } from "./Collections";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";

const CollectionProductsSchema = defineEntity({
  name: "collection_products",
  properties: {
    collection: () =>
      p.manyToOne(Collections).primary().ref().updateRule("no action"),
    product: () =>
      p.manyToOne(Products).primary().ref().updateRule("no action"),
    productVariant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
    position: p.integer().default(1),
  },
});

export class CollectionProducts extends CollectionProductsSchema.class {}

CollectionProductsSchema.setClass(CollectionProducts);
