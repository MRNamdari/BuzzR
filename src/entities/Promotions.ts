import { defineEntity, p } from "@mikro-orm/core";
import { PromotionActions } from "./PromotionActions";
import { PromotionCampaigns } from "./PromotionCampaigns";
import { PromotionConditions } from "./PromotionConditions";
import { PromotionTargets } from "./PromotionTargets";
import { PromotionUsage } from "./PromotionUsage";
import { BaseEntity } from "./Base";

const PromotionsSchema = defineEntity({
  name: "promotions",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_promotions_active_time",
      properties: ["isActive", "startsAt", "endsAt"],
    },
  ],
  properties: {
    code: p.string().length(100).nullable().unique("promotions_code_key"),
    name: p.string(),
    description: p.text().nullable(),
    type: p.string().length(50),
    discountType: p.string().length(20).nullable(),
    discountValue: p.decimal().nullable(),
    maxDiscountValue: p.decimal().nullable(),
    usageLimit: p.integer().nullable(),
    usageLimitPerUser: p.integer().nullable(),
    startsAt: p.datetime().nullable(),
    endsAt: p.datetime().nullable(),
    isActive: p.boolean(),
    isStackable: p.boolean(),
    promotionActionsCollection: () =>
      p.oneToMany(PromotionActions).mappedBy("promotion"),
    promotionCampaignLinksInverse: () =>
      p.manyToMany(PromotionCampaigns).mappedBy("promotionCampaignLinks"),
    promotionConditionsCollection: () =>
      p.oneToMany(PromotionConditions).mappedBy("promotion"),
    promotionTargetsCollection: () =>
      p.oneToMany(PromotionTargets).mappedBy("promotion"),
    promotionUsageCollection: () =>
      p.oneToMany(PromotionUsage).mappedBy("promotion"),
  },
});

export class Promotions extends PromotionsSchema.class {}

PromotionsSchema.setClass(Promotions);
