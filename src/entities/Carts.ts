import { defineEntity, p } from "@mikro-orm/core";
import { CartItems } from "./CartItems";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const CartsSchema = defineEntity({
  name: "carts",
  extends: BaseEntity,
  properties: {
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_carts_user"),
    sessionId: p.string().nullable().index("idx_carts_session"),
    isActive: p.boolean(),
    cartItemsCollection: () => p.oneToMany(CartItems).mappedBy("cart"),
  },
});

export class Carts extends CartsSchema.class {}

CartsSchema.setClass(Carts);
