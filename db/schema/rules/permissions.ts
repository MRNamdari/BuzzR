import { pgTable, unique } from "drizzle-orm/pg-core";

export const permissions = pgTable(
  "permissions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
  }),
  (table) => [unique("permissions_name_key").on(table.name)],
);
