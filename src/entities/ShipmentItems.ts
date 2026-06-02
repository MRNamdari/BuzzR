import { defineEntity, p } from "@mikro-orm/core";
import { OrderItems } from "./OrderItems";
import { Shipments } from "./Shipments";

const ShipmentItemsSchema = defineEntity({
  name: "shipment_items",
  properties: {
    id: p.bigint().primary(),
    shipment: () =>
      p
        .manyToOne(Shipments)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_shipment_items_shipment_id"),
    orderItem: () =>
      p
        .manyToOne(OrderItems)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    quantity: p.integer(),
  },
});

export class ShipmentItems extends ShipmentItemsSchema.class {}

ShipmentItemsSchema.setClass(ShipmentItems);
