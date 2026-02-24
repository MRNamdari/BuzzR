import { index, pgTable } from "drizzle-orm/pg-core";
import { userAddresses } from "../customers/user-addresses";
import { users } from "../customers/users";

export const orders = pgTable(
  "orders",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "set null" }),
    status: t.varchar({ length: 20 }).notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    subtotalAmount: t
      .numeric("subtotal_amount", {
        precision: 10,
        scale: 2,
      })
      .notNull(),
    taxAmount: t
      .numeric("tax_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    shippingAmount: t
      .numeric("shipping_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    discountAmount: t
      .numeric("discount_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    totalAmount: t
      .numeric("total_amount", { precision: 10, scale: 2 })
      .notNull(),
    billingAddressId: t
      .bigint("billing_address_id", { mode: "number" })
      .references(() => userAddresses.id, { onDelete: "set null" }),
    shippingAddressId: t
      .bigint("shipping_address_id", { mode: "number" })
      .references(() => userAddresses.id, { onDelete: "set null" }),
    notes: t.varchar("notes", { length: 2000 }),
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
    index("idx_orders_created_at").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_orders_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    index("idx_orders_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
