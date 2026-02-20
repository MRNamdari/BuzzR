import { sql } from "drizzle-orm";
import { check, foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { products } from "../catalog/products";
import { orders } from "../orders/orders";
import { users } from "./users";

export const reviews = pgTable(
  "reviews",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    orderId: t.bigint("order_id", { mode: "number" }),
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
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_reviews_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_reviews_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_reviews_order",
    }).onDelete("set null"),
    check("reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
  ],
);
