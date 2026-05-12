import { index, pgTable } from "drizzle-orm/pg-core";
import { MediaTypeEnum } from "../enums";

export const media = pgTable(
  "media",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    url: t.text().notNull(),
    type: MediaTypeEnum("type").notNull(),
    mimeType: t.varchar("mime_type", { length: 100 }),
    fileSize: t.bigint("file_size", { mode: "number" }),
    width: t.integer(),
    height: t.integer(),
    duration: t.numeric({ precision: 10, scale: 2 }),
    checksum: t.varchar({ length: 255 }),
    metadata: t.jsonb(),
    deletedAt: t.timestamp("deleted_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_media_checksum").using(
      "btree",
      table.checksum.asc().nullsLast().op("text_ops"),
    ),
    index("idx_media_deleted_at").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_media_type").using("btree", table.type.asc().nullsLast()),
  ],
);
