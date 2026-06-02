import { defineEntity, p } from "@mikro-orm/core";
import { OrderItems } from "./OrderItems";
import { Returns } from "./Returns";
import { BaseEntity } from "./Base";

const ReturnItemsSchema = defineEntity({
  name: "return_items",
  extends: BaseEntity,
  properties: {
    return: () =>
      p
        .manyToOne(Returns)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_return_items_return_id"),
    orderItem: () =>
      p
        .manyToOne(OrderItems)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    quantity: p.integer(),
    condition: p.string().length(50).nullable(),
  },
});

export class ReturnItems extends ReturnItemsSchema.class {}

ReturnItemsSchema.setClass(ReturnItems);
