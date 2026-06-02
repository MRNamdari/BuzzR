import { defineEntity, p } from "@mikro-orm/core";
import { ProductInventory } from "./ProductInventory";
import { BaseEntity } from "./Base";

const WarehousesSchema = defineEntity({
  name: "warehouses",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    location: p.json().nullable(),
    productInventoryCollection: () =>
      p.oneToMany(ProductInventory).mappedBy("warehouse"),
  },
});

export class Warehouses extends WarehousesSchema.class {}

WarehousesSchema.setClass(Warehouses);
