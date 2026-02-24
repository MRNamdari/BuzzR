import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productBundles = pgTable(
  "product_bundles",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    isDynamic: t.boolean("is_dynamic").default(false).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (t) => [
    uniqueIndex("uq_product_bundles_product_id").using(
      "btree",
      t.productId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
