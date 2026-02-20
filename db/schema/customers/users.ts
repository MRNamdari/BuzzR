import { index, pgTable, unique } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    email: t.text().notNull(),
    birthday: t.date(),
    phoneNumber: t.varchar("phone_number", { length: 15 }).notNull(),
    lastLogin: t.timestamp("last_login", {
      withTimezone: true,
      mode: "string",
    }),
    status: t.varchar({ length: 20 }).default("active").notNull(),
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
    index("idx_users_created_at").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_users_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    unique("users_email_key").on(table.email),
    unique("users_phone_number_key").on(table.phoneNumber),
  ],
);
