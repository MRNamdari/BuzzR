import { index, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

export const wishlists = pgTable(
  "wishlists",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    name: t.varchar({ length: 255 }).default("Default").notNull(),
    isDefault: t.boolean("is_default").default(false).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_wishlists_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
