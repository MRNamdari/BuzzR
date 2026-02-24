import { pgTable, unique } from "drizzle-orm/pg-core";
import { shippingZones } from "./shipping-zones";

export const shippingMethods = pgTable(
  "shipping_methods",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    zoneId: t
      .bigint("zone_id", { mode: "number" })
      .references(() => shippingZones.id, { onDelete: "set null" }),
    name: t.varchar({ length: 255 }).notNull(),
    code: t.varchar({ length: 100 }).notNull(),
    isActive: t.boolean("is_active").default(true).notNull(),
    basePrice: t
      .numeric("base_price", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    pricePerKg: t
      .numeric("price_per_kg", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    minOrderTotal: t.numeric("min_order_total", { precision: 10, scale: 2 }),
    maxOrderTotal: t.numeric("max_order_total", { precision: 10, scale: 2 }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [unique("shipping_methods_code_key").on(table.code)],
);
