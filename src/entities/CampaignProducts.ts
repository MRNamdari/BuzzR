import { defineEntity, p } from "@mikro-orm/core";
import { Campaigns } from "./Campaigns";
import { ProductVariants } from "./ProductVariants";
import { Products } from "./Products";

const CampaignProductsSchema = defineEntity({
  name: "campaign_products",
  properties: {
    campaign: () =>
      p.manyToOne(Campaigns).primary().ref().updateRule("no action"),
    product: () =>
      p.manyToOne(Products).primary().ref().updateRule("no action"),
    variant: () =>
      p
        .manyToOne(ProductVariants)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .nullable(),
  },
});

export class CampaignProducts extends CampaignProductsSchema.class {}

CampaignProductsSchema.setClass(CampaignProducts);
