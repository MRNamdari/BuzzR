import { sql } from "drizzle-orm";
import { check, index, pgTable } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { orders } from "../orders/orders";
import { users } from "./users";
import { productVariants } from "../schema";

export const reviews = pgTable(
  "reviews",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
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
    orderId: t
      .bigint("order_id", { mode: "number" })
      .references(() => orders.id, { onDelete: "set null" }),
    rating: t.integer().notNull(),
    title: t.varchar({ length: 255 }),
    body: t.text(),
    isApproved: t.boolean("is_approved").default(false).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_reviews_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_reviews_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    check("reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
  ],
);
