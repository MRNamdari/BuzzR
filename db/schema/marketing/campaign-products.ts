import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { campaigns } from "./campaigns";
import { productVariants } from "../schema";

export const campaignProducts = pgTable(
  "campaign_products",
  (t) => ({
    campaignId: t
      .bigint("campaign_id", { mode: "number" })
      .references(() => campaigns.id, { onDelete: "cascade" })
      .notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: t
      .bigint("variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
  }),
  (table) => [
    primaryKey({
      columns: [table.campaignId, table.productId],
      name: "campaign_products_pkey",
    }),
  ],
);
