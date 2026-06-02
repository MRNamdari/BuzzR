import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";
import { ReviewVotes } from "./ReviewVotes";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const ReviewsSchema = defineEntity({
  name: "reviews",
  extends: BaseEntity,
  properties: {
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_reviews_user_id"),
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_reviews_product_id"),
    variant: () =>
      p.manyToOne(ProductVariants).ref().updateRule("no action").nullable(),
    order: () => p.manyToOne(Orders).ref().updateRule("no action").nullable(),
    rating: p.integer(),
    title: p.string().nullable(),
    body: p.text().nullable(),
    isApproved: p.boolean(),
    reviewVotesCollection: () => p.oneToMany(ReviewVotes).mappedBy("review"),
  },
});

export class Reviews extends ReviewsSchema.class {}

ReviewsSchema.setClass(Reviews);
