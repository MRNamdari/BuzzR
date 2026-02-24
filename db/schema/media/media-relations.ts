import { index, pgTable } from "drizzle-orm/pg-core";
import { media } from "./media";

export const mediaRelationsTable = pgTable(
  "media_relations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t
      .bigint("media_id", { mode: "number" })
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    entityType: t.varchar("entity_type", { length: 50 }).notNull(),
    entityId: t.bigint("entity_id", { mode: "number" }).notNull(),
    role: t.varchar({ length: 50 }).default("gallery").notNull(),
    position: t.integer().default(0).notNull(),
    metadata: t.jsonb(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_media_relations_entity").on(table.entityType, table.entityId),
    index("idx_media_relations_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
