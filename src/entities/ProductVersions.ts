import { defineEntity, p } from "@mikro-orm/core";
import { Products } from "./Products";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const ProductVersionsSchema = defineEntity({
  name: "product_versions",
  extends: BaseEntity,
  uniques: [
    {
      name: "product_versions_product_id_version_number_key",
      properties: ["product", "versionNumber"],
    },
  ],
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_versions_product_id"),
    versionNumber: p.integer(),
    dataSnapshot: p.json(),
    createdBy: () =>
      p
        .manyToOne(Users)
        .ref()
        .name("created_by")
        .updateRule("no action")
        .nullable(),
  },
});

export class ProductVersions extends ProductVersionsSchema.class {}

ProductVersionsSchema.setClass(ProductVersions);
