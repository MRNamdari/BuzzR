import { foreignKey, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { promotionCampaigns } from "./promotion-campaigns";
import { promotions } from "./promotions";

export const promotionCampaignLinks = pgTable(
  "promotion_campaign_links",
  (t) => ({
    campaignId: t.bigint("campaign_id", { mode: "number" }).notNull(),
    promotionId: t.bigint("promotion_id", { mode: "number" }).notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [promotionCampaigns.id],
      name: "fk_promotion_campaign_links_campaign",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_campaign_links_promotion",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.campaignId, table.promotionId],
      name: "promotion_campaign_links_pkey",
    }),
  ],
);
