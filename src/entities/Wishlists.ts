import { defineEntity, p } from "@mikro-orm/core";
import { Users } from "./Users";
import { WishlistItems } from "./WishlistItems";
import { BaseEntity } from "./Base";

const WishlistsSchema = defineEntity({
  name: "wishlists",
  extends: BaseEntity,
  properties: {
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_wishlists_user_id"),
    name: p.string(),
    isDefault: p.boolean(),
    wishlistItemsCollection: () =>
      p.oneToMany(WishlistItems).mappedBy("wishlist"),
  },
});

export class Wishlists extends WishlistsSchema.class {}

WishlistsSchema.setClass(Wishlists);
