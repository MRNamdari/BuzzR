import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { promotions } from "./promotions";

export const promotionTargets = pgTable(
  "promotion_targets",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    promotionId: t.bigint("promotion_id", { mode: "number" }).notNull(),
    targetType: t.varchar("target_type", { length: 50 }).notNull(),
    targetId: t.bigint("target_id", { mode: "number" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_promotion_targets_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_targets_promotion",
    }).onDelete("cascade"),
  ],
);
