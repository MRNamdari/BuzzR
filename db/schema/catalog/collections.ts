import { pgTable, unique } from "drizzle-orm/pg-core";

export const collections = pgTable(
  "collections",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    slug: t.varchar({ length: 255 }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: t.timestamp("deleted_at", {
      withTimezone: true,
      mode: "string",
    }),
  }),
  (table) => [unique("collections_slug_key").on(table.slug)],
);
