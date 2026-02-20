import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const seoMetadata = pgTable(
  "seo_metadata",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    entityType: t.varchar("entity_type", { length: 50 }).notNull(),
    entityId: t.bigint("entity_id", { mode: "number" }).notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    metaTitle: t.varchar("meta_title", { length: 255 }),
    metaDescription: t.text("meta_description"),
    metaKeywords: t.text("meta_keywords"),
    ogTitle: t.varchar("og_title", { length: 255 }),
    ogDescription: t.text("og_description"),
    ogImageUrl: t.text("og_image_url"),
  }),
  (t) => [
    index("idx_seo_metadata_entity").on(t.entityType, t.entityId),
    unique("seo_metadata_entity_type_entity_id_locale_key").on(
      t.entityId,
      t.entityType,
      t.locale,
    ),
  ],
);
