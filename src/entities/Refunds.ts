import { defineEntity, p } from "@mikro-orm/core";
import { OrderItems } from "./OrderItems";
import { Payments } from "./Payments";
import { BaseEntity } from "./Base";

const RefundsSchema = defineEntity({
  name: "refunds",
  extends: BaseEntity,
  properties: {
    payment: () =>
      p
        .manyToOne(Payments)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_refunds_payment_id"),
    orderItem: () =>
      p
        .manyToOne(OrderItems)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_refunds_order_item_id"),
    amount: p.decimal(),
    reason: p.text().nullable(),
  },
});

export class Refunds extends RefundsSchema.class {}

RefundsSchema.setClass(Refunds);
