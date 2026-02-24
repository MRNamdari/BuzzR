import { index, pgTable } from "drizzle-orm/pg-core";
import { orders } from "../orders/orders";
import { promotions } from "./promotions";
import { users } from "../customers/users";

export const promotionUsage = pgTable(
  "promotion_usage",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    promotionId: t
      .bigint("promotion_id", { mode: "number" })
      .references(() => promotions.id, { onDelete: "cascade" })
      .notNull(),
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "set null" }),
    orderId: t
      .bigint("order_id", { mode: "number" })
      .references(() => orders.id, { onDelete: "set null" }),
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
  ],
);
