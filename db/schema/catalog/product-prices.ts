import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { CurrencyEnum } from "../enums";
import { products } from "./products";

export const productPrices = pgTable(
  "product_prices",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: t
      .bigint("variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    currency: CurrencyEnum().default("IRR"),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
  }),
  (table) => [
    index("idx_product_prices_variation_currency").on(
      table.productId,
      table.currency,
    ),
    unique("product_prices_variation_id_currency_key").on(
      table.currency,
      table.productId,
      table.variantId,
    ),
  ],
);
