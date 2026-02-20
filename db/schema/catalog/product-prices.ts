import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";

export const productPrices = pgTable(
  "product_prices",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    variationId: t.bigint("variation_id", { mode: "number" }).notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
  }),
  (table) => [
    index("idx_product_prices_variation_currency").on(
      table.variationId,
      table.currency,
    ),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_product_prices_variant_id",
    }).onDelete("cascade"),
    unique("product_prices_variation_id_currency_key").on(
      table.currency,
      table.variationId,
    ),
  ],
);
