import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { promotionCampaigns } from "./promotion-campaigns";
import { promotions } from "./promotions";

export const promotionCampaignLinks = pgTable(
  "promotion_campaign_links",
  (t) => ({
    campaignId: t
      .bigint("campaign_id", { mode: "number" })
      .references(() => promotionCampaigns.id, { onDelete: "cascade" })
      .notNull(),
    promotionId: t
      .bigint("promotion_id", { mode: "number" })
      .references(() => promotions.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (table) => [
    primaryKey({
      columns: [table.campaignId, table.promotionId],
      name: "promotion_campaign_links_pkey",
    }),
  ],
);
