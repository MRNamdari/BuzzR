import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { locale } from "../system/settings";

export const userTiers = pgTable(
  "user_tier_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: t.varchar({ length: 50 }).notNull(),
    locale: t
      .bigint({ mode: "number" })
      .references(() => locale.id, { onDelete: "cascade" })
      .notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
  }),
  (table) => [unique("user_tiers_code_key").on(table.code, table.locale)],
);
