import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { attributes } from "./attributes";

export const attributeValues = pgTable(
  "attribute_values",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    attributeId: t.bigint("attribute_id", { mode: "number" }).notNull(),
    value: t.varchar({ length: 255 }).notNull(),
    sortOrder: t.integer("sort_order").default(0).notNull(),
  }),
  (table) => [
    index("idx_attribute_values_attribute_id").using(
      "btree",
      table.attributeId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.attributeId],
      foreignColumns: [attributes.id],
      name: "fk_attribute_values_attribute",
    }).onDelete("cascade"),
    unique("attribute_values_attribute_id_value_key").on(
      table.attributeId,
      table.value,
    ),
  ],
);
