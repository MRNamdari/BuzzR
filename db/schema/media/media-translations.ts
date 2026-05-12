import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";
import { locale } from "../system/settings";

export const mediaTranslations = pgTable(
  "media_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t
      .bigint("media_id", { mode: "number" })
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    locale: t
      .varchar({ length: 10 })
      .references(() => locale.id, { onDelete: "cascade" })
      .notNull(),
    altText: t.text("alt_text"),
    caption: t.text(),
  }),
  (table) => [
    index("idx_media_translations_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    unique("media_translations_media_id_locale_key").on(
      table.locale,
      table.mediaId,
    ),
  ],
);
