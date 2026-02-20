import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { orders } from "../orders/orders";
import { promotions, users } from "../schema";

export const promotionUsage = pgTable(
  "promotion_usage",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    promotionId: t.bigint("promotion_id", { mode: "number" }).notNull(),
    userId: t.bigint("user_id", { mode: "number" }),
    orderId: t.bigint("order_id", { mode: "number" }),
    usedAt: t
      .timestamp("used_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_promotion_usage_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_promotion_usage_user").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_usage_promotion",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_promotion_usage_user",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_promotion_usage_order",
    }).onDelete("set null"),
  ],
);
