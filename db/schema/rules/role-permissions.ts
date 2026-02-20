import { foreignKey, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { permissions } from "./permissions";
import { roles } from "./roles";

export const rolePermissions = pgTable(
  "role_permissions",
  (t) => ({
    roleId: t.bigint("role_id", { mode: "number" }).notNull(),
    permissionId: t.bigint("permission_id", { mode: "number" }).notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_role_permissions_role",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.permissionId],
      foreignColumns: [permissions.id],
      name: "fk_role_permissions_permission",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.permissionId, table.roleId],
      name: "role_permissions_pkey",
    }),
  ],
);
