import { defineEntity, p } from "@mikro-orm/core";
import { Products } from "./Products";
import { ProductAvailabilityStatus } from "./TProductAvailabilityStatus";
import { ProductPublishStatus } from "./TProductPublishStatus";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const ProductStatusHistorySchema = defineEntity({
  name: "product_status_history",
  extends: BaseEntity,
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_status_history_product"),
    oldPublishStatus: p
      .enum(() => ProductPublishStatus)
      .nativeEnumName("product_publish_status")
      .nullable(),
    newPublishStatus: p
      .enum(() => ProductPublishStatus)
      .nativeEnumName("product_publish_status")
      .nullable(),
    oldAvailabilityStatus: p
      .enum(() => ProductAvailabilityStatus)
      .nativeEnumName("product_availability_status")
      .nullable(),
    newAvailabilityStatus: p
      .enum(() => ProductAvailabilityStatus)
      .nativeEnumName("product_availability_status")
      .nullable(),
    changedBy: () =>
      p
        .manyToOne(Users)
        .ref()
        .name("changed_by")
        .updateRule("no action")
        .nullable(),
  },
});

export class ProductStatusHistory extends ProductStatusHistorySchema.class {}

ProductStatusHistorySchema.setClass(ProductStatusHistory);
