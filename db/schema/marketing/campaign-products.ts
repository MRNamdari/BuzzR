import { foreignKey, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { campaigns } from "./campaigns";

export const campaignProducts = pgTable(
  "campaign_products",
  (t) => ({
    campaignId: t.bigint("campaign_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [campaigns.id],
      name: "fk_campaign_products_campaign",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_campaign_products_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.campaignId, table.productId],
      name: "campaign_products_pkey",
    }),
  ],
);
