import { foreignKey, index, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { roles } from "../rules/roles";
import { users } from "./users";

export const userRoles = pgTable(
  "user_roles",
  (t) => ({
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    roleId: t
      .bigint("role_id", { mode: "number" })
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (table) => [
    index("idx_user_roles_role_id").using(
      "btree",
      table.roleId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_user_roles_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    primaryKey({
      columns: [table.roleId, table.userId],
      name: "user_roles_pkey",
    }),
  ],
);
