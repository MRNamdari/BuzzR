import { foreignKey, pgTable } from "drizzle-orm/pg-core";

export const locations = pgTable(
  "locations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    countryCode: t.varchar("country_code", { length: 2 }).notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    provinceId: t.bigint("province_id", { mode: "number" }),
  }),
  (table) => [
    foreignKey({
      columns: [table.provinceId],
      foreignColumns: [table.id],
      name: "fk_locations_province",
    }).onDelete("set null"),
  ],
);
