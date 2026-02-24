import { index, pgTable } from "drizzle-orm/pg-core";
import { promotions } from "./promotions";

export const promotionActions = pgTable(
  "promotion_actions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    promotionId: t
      .bigint("promotion_id", { mode: "number" })
      .references(() => promotions.id, { onDelete: "cascade" })
      .notNull(),
    actionType: t.varchar("action_type", { length: 50 }).notNull(),
    actionJson: t.jsonb("action_json").notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_promotion_actions_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
