import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";

export const mediaTranslations = pgTable(
  "media_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t.bigint("media_id", { mode: "number" }).notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    altText: t.text("alt_text"),
    caption: t.text(),
  }),
  (table) => [
    index("idx_media_translations_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_translations_media",
    }).onDelete("cascade"),
    unique("media_translations_media_id_locale_key").on(
      table.locale,
      table.mediaId,
    ),
  ],
);
