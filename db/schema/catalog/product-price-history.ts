import { check, index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { sql } from "drizzle-orm";

export const productPriceHistory = pgTable(
  "product_price_history",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    variationId: t
      .bigint("variation_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    validFrom: t
      .timestamp("valid_from", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    validTo: t.timestamp("valid_to", { withTimezone: true, mode: "string" }),
  }),
  (table) => [
    index("idx_pph_valid_from_to").using(
      "btree",
      table.validFrom.asc().nullsLast().op("timestamptz_ops"),
      table.validTo.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_pph_variation_currency").on(table.variationId, table.currency),
    check("chk_valid_to", sql`(valid_to IS NULL) OR (valid_to > valid_from)`),
  ],
);
