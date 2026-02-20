import { foreignKey, pgTable, unique } from "drizzle-orm/pg-core";
import { roles } from "./roles";

export const rolesTranslations = pgTable(
  "roles_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    roleId: t.bigint("role_id", { mode: "number" }).notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    name: t.varchar({ length: 50 }).notNull(),
    description: t.text(),
  }),
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_role_id",
    }).onDelete("cascade"),
    unique("roles_translations_role_id_locale_key").on(
      table.locale,
      table.roleId,
    ),
  ],
);
