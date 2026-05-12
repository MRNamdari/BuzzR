import { index, pgTable } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { suppliers } from "../logistics/suppliers";
import { products } from "./products";

export const productPurchasePrices = pgTable(
  "product_purchase_prices",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: t
      .bigint("variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    supplierId: t
      .bigint("supplier_id", { mode: "number" })
      .references(() => suppliers.id, { onDelete: "set null" }),
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
    index("idx_ppp_variant_currency").on(table.variantId, table.currency),
  ],
);
