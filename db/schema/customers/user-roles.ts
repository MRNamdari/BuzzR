import { foreignKey, index, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { roles } from "../rules/roles";
import { users } from "./users";

export const userRoles = pgTable(
  "user_roles",
  (t) => ({
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    roleId: t.bigint("role_id", { mode: "number" }).notNull(),
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
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_roles_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_user_roles_role",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.roleId, table.userId],
      name: "user_roles_pkey",
    }),
  ],
);
