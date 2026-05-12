import { pgTable, unique } from "drizzle-orm/pg-core";

export const locale = pgTable(
  "locale",
  (t) => ({
    id: t.bigserial("id", { mode: "number" }).primaryKey().notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    code: t.varchar({ length: 3 }).notNull(),
  }),
  (t) => [unique("locale_code").on(t.code)],
);
