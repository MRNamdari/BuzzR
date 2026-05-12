import { sql } from "drizzle-orm";
import { check, index, pgTable, unique } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { warehouses } from "../logistics/warehouses";
import { products } from "./products";

export const productInventory = pgTable(
  "product_inventory",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variationId: t
      .bigint("variation_id", { mode: "number" })
      .references(() => productVariants.id, { onDelete: "cascade" }),
    warehouseId: t
      .bigint("warehouse_id", { mode: "number" })
      .references(() => warehouses.id, { onDelete: "set null" }),
    stockQuantity: t.integer("stock_quantity").default(0).notNull(),
    stockReserved: t.integer("stock_reserved").default(0).notNull(),
    stockThreshold: t.integer("stock_threshold").default(0).notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (t) => [
    index("idx_product_inventory_product_id").using(
      "btree",
      t.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_product_inventory_warehouse_id").using(
      "btree",
      t.warehouseId.asc().nullsLast().op("int8_ops"),
    ),
    unique("product_inventory_product_id_warehouse_id_key").on(
      t.productId,
      t.warehouseId,
    ),
    check("chk_stock_quantity_non_negative", sql`stock_quantity >= 0`),
    check("chk_stock_reserved_non_negative", sql`stock_reserved >= 0`),
    check("chk_stock_threshold_non_negative", sql`stock_threshold >= 0`),
    check(
      "chk_stock_reserved_not_exceed_quantity",
      sql`stock_reserved <= stock_quantity`,
    ),
  ],
);
