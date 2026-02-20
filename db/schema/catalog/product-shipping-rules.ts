import { foreignKey, pgTable } from "drizzle-orm/pg-core";
import { products } from "./products";
import { shippingMethods } from "../logistics/shipping-methods";

export const productShippingRules = pgTable(
  "product_shipping_rules",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    shippingMethodId: t.bigint("shipping_method_id", { mode: "number" }),
    isExcluded: t.boolean("is_excluded").default(false).notNull(),
    extraFee: t.numeric("extra_fee", { precision: 10, scale: 2 }),
  }),
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_shipping_rules_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.shippingMethodId],
      foreignColumns: [shippingMethods.id],
      name: "fk_product_shipping_rules_method",
    }).onDelete("set null"),
  ],
);
