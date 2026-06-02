import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Warehouses } from "./Warehouses";
import { BaseEntity } from "./Base";

const ProductInventorySchema = defineEntity({
  name: "product_inventory",
  extends: BaseEntity,
  uniques: [
    {
      name: "product_inventory_product_id_warehouse_id_key",
      properties: ["product", "warehouse"],
    },
  ],
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_inventory_product_id"),
    variation: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
    warehouse: () =>
      p
        .manyToOne(Warehouses)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_product_inventory_warehouse_id"),
    stockQuantity: p.integer(),
    stockReserved: p.integer(),
    stockThreshold: p.integer(),
  },
});
export class ProductInventory extends ProductInventorySchema.class {}

ProductInventorySchema.setClass(ProductInventory);
