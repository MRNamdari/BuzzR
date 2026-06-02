import { defineEntity, p } from "@mikro-orm/core";
import { CampaignProducts } from "./CampaignProducts";
import { Policies } from "./Policies";
import { BaseEntity } from "./Base";

const CampaignsSchema = defineEntity({
  name: "campaigns",
  indexes: [
    {
      name: "idx_campaigns_active_time",
      properties: ["isActive", "startsAt", "endsAt"],
    },
  ],
  checks: [
    {
      expression: (cols) => `${cols.startsAt} < ${cols.endsAt}`,
    },
  ],
  extends: BaseEntity,
  properties: {
    code: p.string().length(100).unique("campaigns_code_key"),
    name: p.string(),
    description: p.text().nullable(),
    startsAt: p.datetime().defaultRaw("now()"),
    endsAt: p.datetime().defaultRaw("now()"),
    isActive: p.boolean().default(false),
    campaignProductsCollection: () =>
      p.oneToMany(CampaignProducts).mappedBy("campaign"),
    policiesCollection: () => p.oneToMany(Policies).mappedBy("campaign"),
  },
});

export class Campaigns extends CampaignsSchema.class {}

CampaignsSchema.setClass(Campaigns);
