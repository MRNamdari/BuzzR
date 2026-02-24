import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";

export const mediaTags = pgTable(
  "media_tags",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t
      .bigint("media_id", { mode: "number" })
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    tag: t.varchar({ length: 100 }).notNull(),
    value: t.varchar({ length: 255 }).notNull(),
  }),
  (table) => [
    index("idx_media_tags_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    unique("media_tags_media_id_tag_value_key").on(
      table.mediaId,
      table.tag,
      table.value,
    ),
  ],
);
