import { pgTable, unique } from "drizzle-orm/pg-core";
import { locale } from "../system/settings";
import { promotions } from "./promotions";

export const promotionTranslations = pgTable(
  "user_tier_translations",
  (t) => ({
    promotionId: t
      .bigint({ mode: "number" })
      .references(() => promotions.id, { onDelete: "cascade" })
      .notNull(),
    code: t.varchar({ length: 50 }).notNull(),
    locale: t
      .bigint({ mode: "number" })
      .references(() => locale.id, { onDelete: "cascade" })
      .notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
  }),

  (table) => [unique("promotions_code_key").on(table.code, table.locale)],
);
