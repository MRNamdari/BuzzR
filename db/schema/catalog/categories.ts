import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    parentId: t.bigint("parent_id", { mode: "number" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: t.timestamp("deleted_at", {
      withTimezone: true,
      mode: "string",
    }),
  }),
  (table) => [
    index("idx_categories_parent_id").using(
      "btree",
      table.parentId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "fk_categories_parent",
    }).onDelete("set null"),
  ],
);
