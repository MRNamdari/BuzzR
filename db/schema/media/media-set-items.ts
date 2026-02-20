import { foreignKey, pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";
import { mediaSets } from "./media-sets";

export const mediaSetItems = pgTable(
  "media_set_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaSetId: t.bigint("media_set_id", { mode: "number" }).notNull(),
    mediaId: t.bigint("media_id", { mode: "number" }).notNull(),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.mediaSetId],
      foreignColumns: [mediaSets.id],
      name: "fk_media_set_items_set",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_set_items_media",
    }).onDelete("cascade"),
    unique("media_set_items_media_set_id_media_id_key").on(
      table.mediaId,
      table.mediaSetId,
    ),
  ],
);
