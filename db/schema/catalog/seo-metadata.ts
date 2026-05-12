import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { locale } from "../system/settings";
import { EntityTypeEnum } from "../enums";

export const seoMetadata = pgTable(
  "seo_metadata",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    entityType: EntityTypeEnum().notNull(),
    entityId: t.bigint("entity_id", { mode: "number" }).notNull(),
    locale: t
      .bigint("locale_id", { mode: "number" })
      .references(() => locale.id, { onDelete: "cascade" })
      .notNull(),
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
