import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "../customers/users";

export const productVersions = pgTable(
  "product_versions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    versionNumber: t.integer("version_number").notNull(),
    dataSnapshot: t.jsonb("data_snapshot").notNull(),
    createdBy: t.bigint("created_by", { mode: "number" }),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (t) => [
    index("idx_product_versions_product_id").using(
      "btree",
      t.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [t.productId],
      foreignColumns: [products.id],
      name: "fk_product_versions_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [t.createdBy],
      foreignColumns: [users.id],
      name: "fk_product_versions_user",
    }).onDelete("set null"),
    unique("product_versions_product_id_version_number_key").on(
      t.productId,
      t.versionNumber,
    ),
  ],
);
