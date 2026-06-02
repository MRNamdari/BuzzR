import { defineEntity, p } from "@mikro-orm/core";
import { Promotions } from "./Promotions";
import { BaseEntity } from "./Base";

const PromotionConditionsSchema = defineEntity({
  name: "promotion_conditions",
  extends: BaseEntity,
  properties: {
    promotion: () =>
      p
        .manyToOne(Promotions)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_promotion_conditions_promotion"),
    conditionJson: p.json(),
  },
});

export class PromotionConditions extends PromotionConditionsSchema.class {}

PromotionConditionsSchema.setClass(PromotionConditions);
