import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productTranslations = pgTable(
  "product_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    slug: t.varchar({ length: 255 }).notNull(),
    description: t.text(),
    shortDescription: t.text("short_description"),
    metaTitle: t.varchar("meta_title", { length: 255 }),
    metaDescription: t.text("meta_description"),
    metaKeywords: t.text("meta_keywords"),
  }),
  (table) => [
    index("idx_product_translations_locale").using(
      "btree",
      table.locale.asc().nullsLast().op("text_ops"),
    ),
    unique("product_translations_product_id_locale_key").on(
      table.locale,
      table.productId,
    ),
    unique("product_translations_locale_slug_key").on(table.locale, table.slug),
  ],
);
