import { pgTable } from "drizzle-orm/pg-core";
import { products } from "./products";
import { shippingMethods } from "../logistics/shipping-methods";

export const productShippingRules = pgTable("product_shipping_rules", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  productId: t
    .bigint("product_id", { mode: "number" })
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  shippingMethodId: t
    .bigint("shipping_method_id", { mode: "number" })
    .references(() => shippingMethods.id, { onDelete: "set null" }),
  isExcluded: t.boolean("is_excluded").default(false).notNull(),
  extraFee: t.numeric("extra_fee", { precision: 10, scale: 2 }),
}));
