import { pgTable } from "drizzle-orm/pg-core";

export const suppliers = pgTable("suppliers", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  contactInfo: t.jsonb("contact_info"),
  createdAt: t
    .timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
}));
