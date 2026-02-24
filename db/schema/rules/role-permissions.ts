import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { permissions } from "./permissions";
import { roles } from "./roles";

export const rolePermissions = pgTable(
  "role_permissions",
  (t) => ({
    roleId: t
      .bigint("role_id", { mode: "number" })
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: t
      .bigint("permission_id", { mode: "number" })
      .references(() => permissions.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (table) => [
    primaryKey({
      columns: [table.permissionId, table.roleId],
      name: "role_permissions_pkey",
    }),
  ],
);
