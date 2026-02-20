import { pgTable } from "drizzle-orm/pg-core";

export const shippingZones = pgTable("shipping_zones", (t) => ({
  id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  countries: t.text().array(),
  createdAt: t
    .timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
}));
