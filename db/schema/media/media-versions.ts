import { pgTable, unique } from "drizzle-orm/pg-core";
import { media } from "./media";
import { users } from "../customers/users";

export const mediaVersions = pgTable(
  "media_versions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    mediaId: t
      .bigint("media_id", { mode: "number" })
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    versionNumber: t.integer("version_number").notNull(),
    dataSnapshot: t.jsonb("data_snapshot").notNull(),
    createdBy: t
      .bigint("created_by", { mode: "number" })
      .references(() => users.id, { onDelete: "set null" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    unique("media_versions_media_id_version_number_key").on(
      table.mediaId,
      table.versionNumber,
    ),
  ],
);
