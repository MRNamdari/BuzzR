import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { ProductRelationType } from "./TProductRelationType";
import { BaseEntity } from "./Base";

const ProductRelationsSchema = defineEntity({
  name: "product_relations",
  extends: BaseEntity,
  uniques: [
    {
      name: "product_relations_product_id_related_product_id_relation_ty_key",
      properties: ["product", "relatedProduct", "relationType"],
    },
  ],
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_relations_product"),
    relatedProduct: () =>
      p.manyToOne(Products).ref().updateRule("no action").deleteRule("cascade"),
    relatedVariant: () =>
      p.manyToOne(ProductVariants).ref().updateRule("no action").nullable(),
    relationType: p
      .enum(() => ProductRelationType)
      .nativeEnumName("product_relation_type"),
    position: p.integer(),
  },
});

export class ProductRelations extends ProductRelationsSchema.class {}

ProductRelationsSchema.setClass(ProductRelations);
