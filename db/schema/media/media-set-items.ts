import { pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";
import { mediaSets } from "./media-sets";

export const mediaSetItems = pgTable(
  "media_set_items",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaSetId: t
      .bigint("media_set_id", { mode: "number" })
      .references(() => mediaSets.id, { onDelete: "cascade" })
      .notNull(),
    mediaId: t
      .bigint("media_id", { mode: "number" })
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    position: t.integer().default(0).notNull(),
  }),
  (table) => [
    unique("media_set_items_media_set_id_media_id_key").on(
      table.mediaId,
      table.mediaSetId,
    ),
  ],
);
