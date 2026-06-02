import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { ReturnItems } from "./ReturnItems";
import { BaseEntity } from "./Base";

const ReturnsSchema = defineEntity({
  name: "returns",
  extends: BaseEntity,
  properties: {
    order: () =>
      p
        .manyToOne(Orders)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_returns_order_id"),
    status: p.string().length(20),
    reason: p.text().nullable(),
    returnItemsCollection: () => p.oneToMany(ReturnItems).mappedBy("return"),
  },
});

export class Returns extends ReturnsSchema.class {}

ReturnsSchema.setClass(Returns);
