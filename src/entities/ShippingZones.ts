import { defineEntity, p } from "@mikro-orm/core";
import { ShippingMethods } from "./ShippingMethods";
import { BaseEntity } from "./Base";

const ShippingZonesSchema = defineEntity({
  name: "shipping_zones",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    countries: p.text().array().nullable(),
    shippingMethodsCollection: () =>
      p.oneToMany(ShippingMethods).mappedBy("zone"),
  },
});

export class ShippingZones extends ShippingZonesSchema.class {}

ShippingZonesSchema.setClass(ShippingZones);
