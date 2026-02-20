import { foreignKey, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { users } from "./users";

export const favorites = pgTable(
  "favorites",
  (t) => ({
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_favorites_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_favorites_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.productId, table.userId],
      name: "favorites_pkey",
    }),
  ],
);
