import { pgTable, unique } from "drizzle-orm/pg-core";

export const promotionCampaigns = pgTable(
  "promotion_campaigns",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
    startsAt: t.timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: t.timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: t.boolean("is_active").default(true).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [unique("promotion_campaigns_code_key").on(table.code)],
);
