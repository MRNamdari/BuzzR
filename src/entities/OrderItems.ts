import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Refunds } from "./Refunds";
import { ReturnItems } from "./ReturnItems";
import { ShipmentItems } from "./ShipmentItems";
import { BaseEntity } from "./Base";
import { ProductBundles } from "./ProductBundles";

const OrderItemsSchema = defineEntity({
  name: "order_items",
  extends: BaseEntity,
  checks: [
    { expression: (cols) => `${cols.quantity} > 0` },
    { expression: (cols) => `${cols.unitPrice} >= 0` },
    { expression: (cols) => `${cols.totalPrice} >= 0` },
    { expression: (cols) => `${cols.taxAmount} >= 0` },
    { expression: (cols) => `${cols.discountAmount} >= 0` },
  ],
  properties: {
    order: () =>
      p
        .manyToOne(Orders)
        .ref()
        .updateRule("no action")
        .deleteRule("set null")
        .index("idx_order_items_order_id"),
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("no action"),
    variant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("no action")
        .nullable(),
    bundle: () =>
      p
        .manyToOne(ProductBundles)
        .ref()
        .updateRule("no action")
        .deleteRule("no action")
        .nullable(),
    quantity: p.integer(),
    unitPrice: p.decimal(),
    purchasePrice: p.decimal().nullable(),
    taxAmount: p.decimal(),
    discountAmount: p.decimal(),
    totalPrice: p.decimal(),
    description: p.string().length(2000).nullable(),
    refundsCollection: () => p.oneToMany(Refunds).mappedBy("orderItem"),
    returnItemsCollection: () => p.oneToMany(ReturnItems).mappedBy("orderItem"),
    shipmentItemsCollection: () =>
      p.oneToMany(ShipmentItems).mappedBy("orderItem"),
  },
});

export class OrderItems extends OrderItemsSchema.class {}

OrderItemsSchema.setClass(OrderItems);
