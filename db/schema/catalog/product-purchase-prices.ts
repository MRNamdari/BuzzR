import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { suppliers } from "../logistics/suppliers";

export const productPurchasePrices = pgTable(
  "product_purchase_prices",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    variationId: t.bigint("variation_id", { mode: "number" }).notNull(),
    supplierId: t.bigint("supplier_id", { mode: "number" }),
    currency: t.varchar({ length: 3 }).notNull(),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    validFrom: t
      .timestamp("valid_from", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    validTo: t.timestamp("valid_to", { withTimezone: true, mode: "string" }),
  }),
  (table) => [
    index("idx_ppp_valid_from_to").using(
      "btree",
      table.validFrom.asc().nullsLast().op("timestamptz_ops"),
      table.validTo.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_ppp_variation_currency").on(table.variationId, table.currency),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_product_purchase_prices_variants_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.supplierId],
      foreignColumns: [suppliers.id],
      name: "fk_product_purchase_prices_supplier_id",
    }).onDelete("set null"),
  ],
);
