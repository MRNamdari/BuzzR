import { defineEntity, p } from "@mikro-orm/core";
import { Promotions } from "./Promotions";
import { BaseEntity } from "./Base";

const PromotionCampaignsSchema = defineEntity({
  name: "promotion_campaigns",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    code: p.string().length(100).unique("promotion_campaigns_code_key"),
    description: p.text().nullable(),
    startsAt: p.datetime().nullable(),
    endsAt: p.datetime().nullable(),
    isActive: p.boolean(),
    promotionCampaignLinks: () =>
      p
        .manyToMany(Promotions)
        .pivotTable("promotion_campaign_links")
        .joinColumn("campaign_id")
        .inverseJoinColumn("promotion_id"),
  },
});

export class PromotionCampaigns extends PromotionCampaignsSchema.class {}

PromotionCampaignsSchema.setClass(PromotionCampaigns);
