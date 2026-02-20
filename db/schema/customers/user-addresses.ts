import { sql } from "drizzle-orm";
import { check, foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { locations } from "../logistics/locations";
import { users } from "./users";

export const userAddresses = pgTable(
  "user_addresses",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    type: t.varchar({ length: 20 }).notNull(),
    isDefault: t.boolean("is_default").default(false).notNull(),
    fullName: t.varchar("full_name", { length: 200 }),
    line1: t.varchar({ length: 255 }).notNull(),
    line2: t.varchar({ length: 255 }),
    city: t.bigint({ mode: "number" }).notNull(),
    state: t.bigint({ mode: "number" }).notNull(),
    postalCode: t.varchar("postal_code", { length: 20 }).notNull(),
    country: t.varchar({ length: 2 }).notNull(),
    receiverName: t
      .varchar("receiver_name", { length: 100 })
      .default(sql`NULL`),
    receiverPhone: t
      .varchar("receiver_phone", { length: 15 })
      .default(sql`NULL`),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_user_addresses_type").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
    ),
    index("idx_user_addresses_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_addresses_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.city],
      foreignColumns: [locations.id],
      name: "fk_user_addresses_city",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.state],
      foreignColumns: [locations.id],
      name: "fk_user_addresses_state",
    }).onDelete("set null"),
    check(
      "chk_address_type",
      sql`(type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying, 'both'::character varying])::text[])`,
    ),
  ],
);
