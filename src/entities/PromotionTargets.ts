import { defineEntity, p } from "@mikro-orm/core";
import { Promotions } from "./Promotions";
import { BaseEntity } from "./Base";

const PromotionTargetsSchema = defineEntity({
  name: "promotion_targets",
  extends: BaseEntity,
  properties: {
    promotion: () =>
      p
        .manyToOne(Promotions)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_promotion_targets_promotion"),
    targetType: p.string().length(50),
    targetId: p.bigint().nullable(),
  },
});

export class PromotionTargets extends PromotionTargetsSchema.class {}

PromotionTargetsSchema.setClass(PromotionTargets);
