import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const products = pgTable(
  "products",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    categoryId: t.bigint("category_id", { mode: "number" }),
    productType: t
      .varchar("product_type", { length: 20 })
      .default("simple")
      .notNull(),
    availabilityStatus: t
      .varchar("availability_status", { length: 20 })
      .default("available")
      .notNull(),
    availableFrom: t.timestamp("available_from", {
      withTimezone: true,
      mode: "string",
    }),
    baseCurrency: t
      .varchar("base_currency", { length: 3 })
      .default("USD")
      .notNull(),
    basePrice: t.numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    taxClassId: t.bigint("tax_class_id", { mode: "number" }),
    publishStatus: t
      .varchar("publish_status", { length: 20 })
      .default("draft")
      .notNull(),
    publishAt: t.timestamp("publish_at", {
      withTimezone: true,
      mode: "string",
    }),
    deletedAt: t.timestamp("deleted_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_products_availability_status").using(
      "btree",
      table.availabilityStatus.asc().nullsLast().op("text_ops"),
    ),
    index("idx_products_deleted_at").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_products_publish_status").using(
      "btree",
      table.publishStatus.asc().nullsLast().op("text_ops"),
    ),
    index("idx_products_type").using(
      "btree",
      table.productType.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "fk_products_category",
    }).onDelete("set null"),
  ],
);
