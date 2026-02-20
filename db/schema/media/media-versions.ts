import { foreignKey, pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";
import { users } from "../customers/users";

export const mediaVersions = pgTable(
  "media_versions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t.bigint("media_id", { mode: "number" }).notNull(),
    versionNumber: t.integer("version_number").notNull(),
    dataSnapshot: t.jsonb("data_snapshot").notNull(),
    createdBy: t.bigint("created_by", { mode: "number" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_versions_media",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
      name: "fk_media_versions_user",
    }).onDelete("set null"),
    unique("media_versions_media_id_version_number_key").on(
      table.mediaId,
      table.versionNumber,
    ),
  ],
);
