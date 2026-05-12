import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const promotions = pgTable(
  "promotions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    type: t.varchar({ length: 50 }).notNull(),
    discountType: t.varchar("discount_type", { length: 20 }),
    discountValue: t.numeric("discount_value", { precision: 10, scale: 2 }),
    maxDiscountValue: t.numeric("max_discount_value", {
      precision: 10,
      scale: 2,
    }),
    usageLimit: t.integer("usage_limit"),
    usageLimitPerUser: t.integer("usage_limit_per_user"),
    startsAt: t.timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: t.timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: t.boolean("is_active").default(true).notNull(),
    isStackable: t.boolean("is_stackable").default(false).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_promotions_active_time").on(
      table.isActive,
      table.startsAt,
      table.endsAt,
    ),
  ],
);
