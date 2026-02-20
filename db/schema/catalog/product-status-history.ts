import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "../customers/users";

export const productStatusHistory = pgTable(
  "product_status_history",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t.bigint("product_id", { mode: "number" }).notNull(),
    oldPublishStatus: t.varchar("old_publish_status", { length: 20 }),
    newPublishStatus: t.varchar("new_publish_status", { length: 20 }),
    oldAvailabilityStatus: t.varchar("old_availability_status", { length: 20 }),
    newAvailabilityStatus: t.varchar("new_availability_status", { length: 20 }),
    changedBy: t.bigint("changed_by", { mode: "number" }),
    changedAt: t
      .timestamp("changed_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_product_status_history_product").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_status_history_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.changedBy],
      foreignColumns: [users.id],
      name: "fk_product_status_history_user",
    }).onDelete("set null"),
  ],
);
