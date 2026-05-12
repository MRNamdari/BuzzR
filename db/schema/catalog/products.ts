import { index, pgTable } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { sql } from "drizzle-orm";
import {
  AvailabilityStatusEnum,
  CurrencyEnum,
  ProductTypeEnum,
  PublishStatusEnum,
} from "../enums";

export const products = pgTable(
  "products",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    slug: t
      .varchar({ length: 255 })
      .unique()
      .default(sql<string>`gen_random_uuid()::text`)
      .notNull(),
    categoryId: t
      .bigint("category_id", { mode: "number" })
      .references(() => categories.id, { onDelete: "set null" }),
    type: ProductTypeEnum().default("simple").notNull(),
    availabilityStatus: AvailabilityStatusEnum("availability_status")
      .default("available")
      .notNull(),
    availableFrom: t.timestamp("available_from", {
      withTimezone: true,
      mode: "string",
    }),
    baseCurrency: CurrencyEnum("base_currency").default("IRR").notNull(),
    basePrice: t.numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    taxClassId: t.bigint("tax_class_id", { mode: "number" }),
    publishStatus: PublishStatusEnum("publish_status")
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
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  }),
  (table) => [
    index("idx_products_availability_status").using(
      "btree",
      table.availabilityStatus.asc().nullsLast(),
    ),
    index("idx_products_deleted_at").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_products_publish_status").using(
      "btree",
      table.publishStatus.asc().nullsLast(),
    ),
    index("idx_products_type").using("btree", table.type.asc().nullsLast()),
  ],
);

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type UpdateProduct = Partial<typeof products.$inferSelect> & {
  id: (typeof products.$inferSelect)["id"];
};
