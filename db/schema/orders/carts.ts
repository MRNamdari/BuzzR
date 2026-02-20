import { pgTable, index, foreignKey } from "drizzle-orm/pg-core";
import { users } from "../customers/users";

export const carts = pgTable(
  "carts",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey(),
    userId: t.bigint("user_id", { mode: "number" }),
    sessionId: t.varchar("session_id", { length: 255 }),
    isActive: t.boolean("is_active").default(true).notNull(),
    createdAt: t
      .timestamp("created_at", {
        withTimezone: true,
        mode: "string",
      })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", {
        withTimezone: true,
        mode: "string",
      })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_carts_user").on(table.userId),
    index("idx_carts_session").on(table.sessionId),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_carts_user",
    }).onDelete("set null"),
  ],
);
