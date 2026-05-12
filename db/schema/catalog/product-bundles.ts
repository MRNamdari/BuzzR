import { pgTable } from "drizzle-orm/pg-core";

export const productBundles = pgTable("product_bundles", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  isDynamic: t.boolean("is_dynamic").default(false).notNull(),
  createdAt: t
    .timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
}));
