import { sql } from "drizzle-orm";
import { check, foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { productVariants } from "./product-variants";
import { warehouses } from "../logistics/warehouses";

export const productInventory = pgTable(
  "product_inventory",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    variationId: t.bigint("variation_id", { mode: "number" }).notNull(),
    warehouseId: t.bigint("warehouse_id", { mode: "number" }),
    stockQuantity: t.integer("stock_quantity").default(0).notNull(),
    stockReserved: t.integer("stock_reserved").default(0).notNull(),
    stockThreshold: t.integer("stock_threshold").default(0).notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (t) => [
    index("idx_product_inventory_variation_id").using(
      "btree",
      t.variationId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_product_inventory_warehouse_id").using(
      "btree",
      t.warehouseId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [t.variationId],
      foreignColumns: [productVariants.id],
      name: "fk_product_inventory_variant",
    }).onDelete("cascade"),
    foreignKey({
      columns: [t.warehouseId],
      foreignColumns: [warehouses.id],
      name: "fk_product_inventory_warehouse",
    }).onDelete("set null"),
    unique("product_inventory_variation_id_warehouse_id_key").on(
      t.variationId,
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
