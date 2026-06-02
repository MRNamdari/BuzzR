import { defineEntity, p } from "@mikro-orm/core";
import { Reviews } from "./Reviews";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const ReviewVotesSchema = defineEntity({
  name: "review_votes",
  extends: BaseEntity,
  uniques: [
    {
      name: "review_votes_review_id_user_id_key",
      properties: ["review", "user"],
    },
  ],
  properties: {
    review: () =>
      p.manyToOne(Reviews).ref().updateRule("no action").deleteRule("cascade"),
    user: () =>
      p.manyToOne(Users).ref().updateRule("no action").deleteRule("cascade"),
    isHelpful: p.boolean(),
  },
});

export class ReviewVotes extends ReviewVotesSchema.class {}

ReviewVotesSchema.setClass(ReviewVotes);
