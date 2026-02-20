import { pgTable } from "drizzle-orm/pg-core";

export const mediaSets = pgTable("media_sets", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text(),
  createdAt: t
    .timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
}));
