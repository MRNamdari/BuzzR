import { defineEntity, p } from "@mikro-orm/core";
import { Promotions } from "./Promotions";
import { BaseEntity } from "./Base";

const PromotionActionsSchema = defineEntity({
  name: "promotion_actions",
  extends: BaseEntity,
  properties: {
    promotion: () =>
      p
        .manyToOne(Promotions)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_promotion_actions_promotion"),
    actionType: p.string().length(50),
    actionJson: p.json(),
  },
});

export class PromotionActions extends PromotionActionsSchema.class {}

PromotionActionsSchema.setClass(PromotionActions);
