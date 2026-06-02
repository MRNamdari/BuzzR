import { defineEntity, p } from "@mikro-orm/core";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const FavoritesSchema = defineEntity({
  name: "favorites",
  extends: BaseEntity,
  properties: {
    user: () => p.manyToOne(Users).primary().ref().updateRule("no action"),
    product: () =>
      p.manyToOne(Products).primary().ref().updateRule("no action"),
    variant: () =>
      p.manyToOne(ProductVariants).ref().updateRule("no action").nullable(),
  },
});

export class Favorites extends FavoritesSchema.class {}

FavoritesSchema.setClass(Favorites);
