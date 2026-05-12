import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "../customers/users";
import { AvailabilityStatusEnum, PublishStatusEnum } from "../enums";

export const productStatusHistory = pgTable(
  "product_status_history",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    productId: t
      .bigint("product_id", { mode: "number" })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    oldPublishStatus: PublishStatusEnum("old_publish_status"),
    newPublishStatus: PublishStatusEnum("new_publish_status"),
    oldAvailabilityStatus: AvailabilityStatusEnum("old_availability_status"),
    newAvailabilityStatus: AvailabilityStatusEnum("new_availability_status"),
    changedBy: t
      .bigint("changed_by", { mode: "number" })
      .references(() => users.id, { onDelete: "set null" }),
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
  ],
);
