import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const categoryTranslations = pgTable(
  "category_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    categoryId: t.bigint("category_id", { mode: "number" }).notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    slug: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
    metaTitle: t.varchar("meta_title", { length: 255 }),
    metaDescription: t.text("meta_description"),
    metaKeywords: t.text("meta_keywords"),
  }),
  (table) => [
    index("idx_category_translations_locale").using(
      "btree",
      table.locale.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "fk_category_translations_category",
    }).onDelete("cascade"),
    unique("category_translations_category_id_locale_key").on(
      table.categoryId,
      table.locale,
    ),
    unique("category_translations_locale_slug_key").on(
      table.locale,
      table.slug,
    ),
  ],
);
