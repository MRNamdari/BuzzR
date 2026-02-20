import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productVariants = pgTable(
  "product_variants",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    sku: t.varchar({ length: 100 }),
    name: t.varchar({ length: 255 }),
    basePrice: t.numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    availabilityStatus: t
      .varchar("availability_status", { length: 20 })
      .default("available")
      .notNull(),
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
    index("idx_product_variants_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_variants_product",
    }).onDelete("cascade"),
    unique("product_variants_sku_key").on(table.sku),
  ],
);
