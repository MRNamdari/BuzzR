import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { ShipmentItems } from "./ShipmentItems";
import { BaseEntity } from "./Base";

const ShipmentsSchema = defineEntity({
  name: "shipments",
  extends: BaseEntity,
  properties: {
    order: () =>
      p
        .manyToOne(Orders)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_shipments_order_id"),
    carrier: p.string().length(100).nullable(),
    trackingNumber: p.string().nullable(),
    status: p.string().length(20),
    shippedAt: p.datetime().nullable(),
    deliveredAt: p.datetime().nullable(),
    shipmentItemsCollection: () =>
      p.oneToMany(ShipmentItems).mappedBy("shipment"),
  },
});

export class Shipments extends ShipmentsSchema.class {}

ShipmentsSchema.setClass(Shipments);
