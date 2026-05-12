import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { users } from "./users";
import { productVariants } from "../schema";

export const favorites = pgTable(
  "favorites",
  (t) => ({
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: t
      .bigint("variant_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "set null" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    primaryKey({
      columns: [table.productId, table.userId],
      name: "favorites_pkey",
    }),
  ],
);
