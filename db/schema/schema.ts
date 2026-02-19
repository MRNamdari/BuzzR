import {
  pgTable,
  index,
  unique,
  bigserial,
  varchar,
  text,
  timestamp,
  boolean,
  foreignKey,
  bigint,
  jsonb,
  numeric,
  integer,
  uniqueIndex,
  check,
  date,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const abacActions = pgTable(
  "abac_actions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }).notNull(),
    description: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_abac_actions_code").using(
      "btree",
      table.code.asc().nullsLast().op("text_ops"),
    ),
    unique("abac_actions_code_key").on(table.code),
  ],
);

export const campaigns = pgTable(
  "campaigns",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    startsAt: timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_campaigns_active_time").using(
      "btree",
      table.isActive.asc().nullsLast().op("bool_ops"),
      table.startsAt.asc().nullsLast().op("bool_ops"),
      table.endsAt.asc().nullsLast().op("bool_ops"),
    ),
    unique("campaigns_code_key").on(table.code),
  ],
);

export const abacResources = pgTable(
  "abac_resources",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }).notNull(),
    description: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_abac_resources_code").using(
      "btree",
      table.code.asc().nullsLast().op("text_ops"),
    ),
    unique("abac_resources_code_key").on(table.code),
  ],
);

export const attributes = pgTable(
  "attributes",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    type: varchar({ length: 20 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("attributes_code_key").on(table.code)],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    actorUserId: bigint("actor_user_id", { mode: "number" }),
    entityType: varchar("entity_type", { length: 50 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    entityId: bigint("entity_id", { mode: "number" }),
    action: varchar({ length: 50 }).notNull(),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_audit_logs_actor").using(
      "btree",
      table.actorUserId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_audit_logs_entity").using(
      "btree",
      table.entityType.asc().nullsLast().op("int8_ops"),
      table.entityId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.actorUserId],
      foreignColumns: [users.id],
      name: "fk_audit_logs_actor",
    }).onDelete("set null"),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    parentId: bigint("parent_id", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
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

export const collectionTranslations = pgTable(
  "collection_translations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    collectionId: bigint("collection_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "fk_collection_translations_collection",
    }).onDelete("cascade"),
    unique("collection_translations_collection_id_locale_key").on(
      table.collectionId,
      table.locale,
    ),
  ],
);

export const mediaSets = pgTable("media_sets", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const mediaTags = pgTable(
  "media_tags",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaId: bigint("media_id", { mode: "number" }).notNull(),
    tag: varchar({ length: 100 }).notNull(),
    value: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    index("idx_media_tags_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_tags_media",
    }).onDelete("cascade"),
    unique("media_tags_media_id_tag_value_key").on(
      table.mediaId,
      table.tag,
      table.value,
    ),
  ],
);

export const giftCards = pgTable(
  "gift_cards",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }).notNull(),
    initialBalance: numeric("initial_balance", {
      precision: 10,
      scale: 2,
    }).notNull(),
    currentBalance: numeric("current_balance", {
      precision: 10,
      scale: 2,
    }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
    status: varchar({ length: 20 }).default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_gift_cards_expires_at").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_gift_cards_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    unique("gift_cards_code_key").on(table.code),
  ],
);

export const mediaRelationsTable = pgTable(
  "media_relations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaId: bigint("media_id", { mode: "number" }).notNull(),
    entityType: varchar("entity_type", { length: 50 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    entityId: bigint("entity_id", { mode: "number" }).notNull(),
    role: varchar({ length: 50 }).default("gallery").notNull(),
    position: integer().default(0).notNull(),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_media_relations_entity").using(
      "btree",
      table.entityType.asc().nullsLast().op("int8_ops"),
      table.entityId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_media_relations_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_relations_media",
    }).onDelete("cascade"),
  ],
);

export const mediaSetItems = pgTable(
  "media_set_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaSetId: bigint("media_set_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaId: bigint("media_id", { mode: "number" }).notNull(),
    position: integer().default(0).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.mediaSetId],
      foreignColumns: [mediaSets.id],
      name: "fk_media_set_items_set",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_set_items_media",
    }).onDelete("cascade"),
    unique("media_set_items_media_set_id_media_id_key").on(
      table.mediaId,
      table.mediaSetId,
    ),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }),
    quantity: integer().notNull(),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
    purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }),
    taxAmount: numeric("tax_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    discountAmount: numeric("discount_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_order_items_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_order_items_order",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_order_items_product",
    }),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_order_items_variation",
    }),
  ],
);

export const mediaVersions = pgTable(
  "media_versions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaId: bigint("media_id", { mode: "number" }).notNull(),
    versionNumber: integer("version_number").notNull(),
    dataSnapshot: jsonb("data_snapshot").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdBy: bigint("created_by", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_versions_media",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
      name: "fk_media_versions_user",
    }).onDelete("set null"),
    unique("media_versions_media_id_version_number_key").on(
      table.mediaId,
      table.versionNumber,
    ),
  ],
);

export const permissions = pgTable(
  "permissions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: text(),
  },
  (table) => [unique("permissions_name_key").on(table.name)],
);

export const orders = pgTable(
  "orders",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }),
    status: varchar({ length: 20 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    subtotalAmount: numeric("subtotal_amount", {
      precision: 10,
      scale: 2,
    }).notNull(),
    taxAmount: numeric("tax_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    shippingAmount: numeric("shipping_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    discountAmount: numeric("discount_amount", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    billingAddressId: bigint("billing_address_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    shippingAddressId: bigint("shipping_address_id", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_orders_created_at").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_orders_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    index("idx_orders_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_orders_user",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.billingAddressId],
      foreignColumns: [userAddresses.id],
      name: "fk_orders_billing_address",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.shippingAddressId],
      foreignColumns: [userAddresses.id],
      name: "fk_orders_shipping_address",
    }).onDelete("set null"),
  ],
);

export const media = pgTable(
  "media",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    url: text().notNull(),
    type: varchar({ length: 20 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    fileSize: bigint("file_size", { mode: "number" }),
    width: integer(),
    height: integer(),
    duration: numeric({ precision: 10, scale: 2 }),
    checksum: varchar({ length: 255 }),
    metadata: jsonb(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_media_checksum").using(
      "btree",
      table.checksum.asc().nullsLast().op("text_ops"),
    ),
    index("idx_media_deleted_at").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_media_type").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const payments = pgTable(
  "payments",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }).notNull(),
    provider: varchar({ length: 50 }).notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    status: varchar({ length: 20 }).notNull(),
    externalReference: varchar("external_reference", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_payments_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_payments_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_payments_order",
    }).onDelete("cascade"),
  ],
);

export const policies = pgTable(
  "policies",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar({ length: 150 }).notNull(),
    type: varchar({ length: 50 }).notNull(),
    effect: varchar({ length: 20 }).notNull(),
    priority: integer().default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    conditionJson: jsonb("condition_json").notNull(),
    payloadJson: jsonb("payload_json"),
    validFrom: timestamp("valid_from", { withTimezone: true, mode: "string" }),
    validTo: timestamp("valid_to", { withTimezone: true, mode: "string" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    campaignId: bigint("campaign_id", { mode: "number" }),
    appliesToSubject: jsonb("applies_to_subject"),
    appliesToResource: jsonb("applies_to_resource"),
    appliesToContext: jsonb("applies_to_context"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_policies_active_time").using(
      "btree",
      table.isActive.asc().nullsLast().op("bool_ops"),
      table.validFrom.asc().nullsLast().op("bool_ops"),
      table.validTo.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_policies_condition_json_gin").using(
      "gin",
      table.conditionJson.asc().nullsLast().op("jsonb_ops"),
    ),
    index("idx_policies_payload_json_gin").using(
      "gin",
      table.payloadJson.asc().nullsLast().op("jsonb_ops"),
    ),
    index("idx_policies_type").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [campaigns.id],
      name: "fk_policies_campaign",
    }).onDelete("set null"),
  ],
);

export const productAttributeValues = pgTable(
  "product_attribute_values",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    attributeId: bigint("attribute_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    attributeValueId: bigint("attribute_value_id", {
      mode: "number",
    }).notNull(),
  },
  (table) => [
    index("idx_pav_attribute_id").using(
      "btree",
      table.attributeId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_pav_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_pav_variation_id").using(
      "btree",
      table.variationId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_attribute_values_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_product_attribute_values_variation",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.attributeId],
      foreignColumns: [attributes.id],
      name: "fk_product_attribute_values_attribute",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.attributeValueId],
      foreignColumns: [attributeValues.id],
      name: "fk_product_attribute_values_attribute_value",
    }).onDelete("cascade"),
  ],
);

export const productBundles = pgTable(
  "product_bundles",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    isDynamic: boolean("is_dynamic").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("uq_product_bundles_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_bundles_product",
    }).onDelete("cascade"),
  ],
);

export const productInventory = pgTable(
  "product_inventory",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    warehouseId: bigint("warehouse_id", { mode: "number" }),
    stockQuantity: integer("stock_quantity").default(0).notNull(),
    stockReserved: integer("stock_reserved").default(0).notNull(),
    stockThreshold: integer("stock_threshold").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_product_inventory_variation_id").using(
      "btree",
      table.variationId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_product_inventory_warehouse_id").using(
      "btree",
      table.warehouseId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_product_inventory_variation",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.warehouseId],
      foreignColumns: [warehouses.id],
      name: "fk_product_inventory_warehouse",
    }).onDelete("set null"),
    unique("product_inventory_variation_id_warehouse_id_key").on(
      table.variationId,
      table.warehouseId,
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

export const productPrices = pgTable(
  "product_prices",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
  },
  (table) => [
    index("idx_product_prices_variation_currency").using(
      "btree",
      table.variationId.asc().nullsLast().op("int8_ops"),
      table.currency.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_product_prices_variation_id",
    }).onDelete("cascade"),
    unique("product_prices_variation_id_currency_key").on(
      table.currency,
      table.variationId,
    ),
  ],
);

export const productPriceHistory = pgTable(
  "product_price_history",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    validFrom: timestamp("valid_from", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    validTo: timestamp("valid_to", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("idx_pph_valid_from_to").using(
      "btree",
      table.validFrom.asc().nullsLast().op("timestamptz_ops"),
      table.validTo.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_pph_variation_currency").using(
      "btree",
      table.variationId.asc().nullsLast().op("text_ops"),
      table.currency.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_product_price_history_variation_id",
    }).onDelete("cascade"),
    check("chk_valid_to", sql`(valid_to IS NULL) OR (valid_to > valid_from)`),
  ],
);

export const productPurchasePrices = pgTable(
  "product_purchase_prices",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    supplierId: bigint("supplier_id", { mode: "number" }),
    currency: varchar({ length: 3 }).notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    validFrom: timestamp("valid_from", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    validTo: timestamp("valid_to", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("idx_ppp_valid_from_to").using(
      "btree",
      table.validFrom.asc().nullsLast().op("timestamptz_ops"),
      table.validTo.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_ppp_variation_currency").using(
      "btree",
      table.variationId.asc().nullsLast().op("text_ops"),
      table.currency.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_product_purchase_prices_variation_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.supplierId],
      foreignColumns: [suppliers.id],
      name: "fk_product_purchase_prices_supplier_id",
    }).onDelete("set null"),
  ],
);

export const productTranslations = pgTable(
  "product_translations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull(),
    description: text(),
    shortDescription: text("short_description"),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    metaKeywords: text("meta_keywords"),
  },
  (table) => [
    index("idx_product_translations_locale").using(
      "btree",
      table.locale.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_translations_product",
    }).onDelete("cascade"),
    unique("product_translations_product_id_locale_key").on(
      table.locale,
      table.productId,
    ),
    unique("product_translations_locale_slug_key").on(table.locale, table.slug),
  ],
);

export const products = pgTable(
  "products",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryId: bigint("category_id", { mode: "number" }),
    productType: varchar("product_type", { length: 20 })
      .default("simple")
      .notNull(),
    availabilityStatus: varchar("availability_status", { length: 20 })
      .default("available")
      .notNull(),
    availableFrom: timestamp("available_from", {
      withTimezone: true,
      mode: "string",
    }),
    baseCurrency: varchar("base_currency", { length: 3 })
      .default("USD")
      .notNull(),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    taxClassId: bigint("tax_class_id", { mode: "number" }),
    publishStatus: varchar("publish_status", { length: 20 })
      .default("draft")
      .notNull(),
    publishAt: timestamp("publish_at", { withTimezone: true, mode: "string" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
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

export const productVariations = pgTable(
  "product_variations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    sku: varchar({ length: 100 }),
    name: varchar({ length: 255 }),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    availabilityStatus: varchar("availability_status", { length: 20 })
      .default("available")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("idx_product_variations_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_variations_product",
    }).onDelete("cascade"),
    unique("product_variations_sku_key").on(table.sku),
  ],
);

export const productRelations = pgTable(
  "product_relations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    relatedProductId: bigint("related_product_id", {
      mode: "number",
    }).notNull(),
    relationType: varchar("relation_type", { length: 20 }).notNull(),
    position: integer().default(0).notNull(),
  },
  (table) => [
    index("idx_product_relations_product").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_relations_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.relatedProductId],
      foreignColumns: [products.id],
      name: "fk_product_relations_related",
    }).onDelete("cascade"),
    unique(
      "product_relations_product_id_related_product_id_relation_ty_key",
    ).on(table.productId, table.relatedProductId, table.relationType),
  ],
);

export const productShippingRules = pgTable(
  "product_shipping_rules",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    shippingMethodId: bigint("shipping_method_id", { mode: "number" }),
    isExcluded: boolean("is_excluded").default(false).notNull(),
    extraFee: numeric("extra_fee", { precision: 10, scale: 2 }),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_shipping_rules_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.shippingMethodId],
      foreignColumns: [shippingMethods.id],
      name: "fk_product_shipping_rules_method",
    }).onDelete("set null"),
  ],
);

export const productStatusHistory = pgTable(
  "product_status_history",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    oldPublishStatus: varchar("old_publish_status", { length: 20 }),
    newPublishStatus: varchar("new_publish_status", { length: 20 }),
    oldAvailabilityStatus: varchar("old_availability_status", { length: 20 }),
    newAvailabilityStatus: varchar("new_availability_status", { length: 20 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    changedBy: bigint("changed_by", { mode: "number" }),
    changedAt: timestamp("changed_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
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

export const productVersions = pgTable(
  "product_versions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    versionNumber: integer("version_number").notNull(),
    dataSnapshot: jsonb("data_snapshot").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdBy: bigint("created_by", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_product_versions_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_product_versions_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.createdBy],
      foreignColumns: [users.id],
      name: "fk_product_versions_user",
    }).onDelete("set null"),
    unique("product_versions_product_id_version_number_key").on(
      table.productId,
      table.versionNumber,
    ),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }),
    rating: integer().notNull(),
    title: varchar({ length: 255 }),
    body: text(),
    isApproved: boolean("is_approved").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_reviews_product_id").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_reviews_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_reviews_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_reviews_product",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_reviews_order",
    }).onDelete("set null"),
    check("reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
  ],
);

export const roles = pgTable("roles", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
});

export const shipmentItems = pgTable(
  "shipment_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    shipmentId: bigint("shipment_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderItemId: bigint("order_item_id", { mode: "number" }).notNull(),
    quantity: integer().notNull(),
  },
  (table) => [
    index("idx_shipment_items_shipment_id").using(
      "btree",
      table.shipmentId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_order_item_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.shipmentId],
      foreignColumns: [shipments.id],
      name: "fk_shipment_id",
    }).onDelete("cascade"),
  ],
);

export const seoMetadata = pgTable(
  "seo_metadata",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    entityType: varchar("entity_type", { length: 50 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    entityId: bigint("entity_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    metaKeywords: text("meta_keywords"),
    ogTitle: varchar("og_title", { length: 255 }),
    ogDescription: text("og_description"),
    ogImageUrl: text("og_image_url"),
  },
  (table) => [
    index("idx_seo_metadata_entity").using(
      "btree",
      table.entityType.asc().nullsLast().op("int8_ops"),
      table.entityId.asc().nullsLast().op("text_ops"),
    ),
    unique("seo_metadata_entity_type_entity_id_locale_key").on(
      table.entityId,
      table.entityType,
      table.locale,
    ),
  ],
);

export const returns = pgTable(
  "returns",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }).notNull(),
    status: varchar({ length: 20 }).notNull(),
    reason: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_returns_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_returns_order",
    }).onDelete("cascade"),
  ],
);

export const reviewVotes = pgTable(
  "review_votes",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    reviewId: bigint("review_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    isHelpful: boolean("is_helpful").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.reviewId],
      foreignColumns: [reviews.id],
      name: "fk_review_votes_review",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_review_votes_user",
    }).onDelete("cascade"),
    unique("review_votes_review_id_user_id_key").on(
      table.reviewId,
      table.userId,
    ),
  ],
);

export const rolesTranslations = pgTable(
  "roles_translations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    roleId: bigint("role_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    name: varchar({ length: 50 }).notNull(),
    description: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_role_id",
    }).onDelete("cascade"),
    unique("roles_translations_role_id_locale_key").on(
      table.locale,
      table.roleId,
    ),
  ],
);

export const userAddresses = pgTable(
  "user_addresses",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    type: varchar({ length: 20 }).notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    fullName: varchar("full_name", { length: 200 }),
    line1: varchar({ length: 255 }).notNull(),
    line2: varchar({ length: 255 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    city: bigint({ mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    state: bigint({ mode: "number" }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    country: varchar({ length: 2 }).notNull(),
    receiverName: varchar("receiver_name", { length: 100 }).default(sql`NULL`),
    receiverPhone: varchar("receiver_phone", { length: 15 }).default(sql`NULL`),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_user_addresses_type").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
    ),
    index("idx_user_addresses_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_addresses_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.city],
      foreignColumns: [locations.id],
      name: "fk_user_addresses_city",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.state],
      foreignColumns: [locations.id],
      name: "fk_user_addresses_state",
    }).onDelete("set null"),
    check(
      "chk_address_type",
      sql`(type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying, 'both'::character varying])::text[])`,
    ),
  ],
);

export const shippingMethods = pgTable(
  "shipping_methods",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    zoneId: bigint("zone_id", { mode: "number" }),
    name: varchar({ length: 255 }).notNull(),
    code: varchar({ length: 100 }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    basePrice: numeric("base_price", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    pricePerKg: numeric("price_per_kg", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    minOrderTotal: numeric("min_order_total", { precision: 10, scale: 2 }),
    maxOrderTotal: numeric("max_order_total", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.zoneId],
      foreignColumns: [shippingZones.id],
      name: "fk_shipping_methods_zone",
    }).onDelete("set null"),
    unique("shipping_methods_code_key").on(table.code),
  ],
);

export const suppliers = pgTable("suppliers", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  contactInfo: jsonb("contact_info"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userAttributes = pgTable(
  "user_attributes",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    key: varchar({ length: 100 }).notNull(),
    valueText: text("value_text"),
    valueNum: numeric("value_num", { precision: 20, scale: 4 }),
    valueBool: boolean("value_bool"),
    valueJson: jsonb("value_json"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_user_attributes_key").using(
      "btree",
      table.key.asc().nullsLast().op("text_ops"),
    ),
    index("idx_user_attributes_key_bool")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueBool.asc().nullsLast().op("bool_ops"),
      )
      .where(sql`(value_bool IS NOT NULL)`),
    index("idx_user_attributes_key_num")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueNum.asc().nullsLast().op("numeric_ops"),
      )
      .where(sql`(value_num IS NOT NULL)`),
    index("idx_user_attributes_key_text")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueText.asc().nullsLast().op("text_ops"),
      )
      .where(sql`(value_text IS NOT NULL)`),
    uniqueIndex("uq_user_attributes_user_key").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
      table.key.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_attributes_user",
    }).onDelete("cascade"),
    check(
      "chk_user_attributes_value",
      sql`((value_text IS NOT NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NOT NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NOT NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NOT NULL))`,
    ),
  ],
);

export const shipments = pgTable(
  "shipments",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }).notNull(),
    carrier: varchar({ length: 100 }),
    trackingNumber: varchar("tracking_number", { length: 255 }),
    status: varchar({ length: 20 }).notNull(),
    shippedAt: timestamp("shipped_at", { withTimezone: true, mode: "string" }),
    deliveredAt: timestamp("delivered_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_shipments_order_id").using(
      "btree",
      table.orderId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_order_id",
    }).onDelete("cascade"),
  ],
);

export const shippingZones = pgTable("shipping_zones", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  countries: text().array(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userTierAssignments = pgTable(
  "user_tier_assignments",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tierId: bigint("tier_id", { mode: "number" }).notNull(),
    assignedAt: timestamp("assigned_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("idx_user_tier_assignments_expires_at").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_user_tier_assignments_tier_id").using(
      "btree",
      table.tierId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_tier_assignments_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.tierId],
      foreignColumns: [userTiers.id],
      name: "fk_user_tier_assignments_tier",
    }).onDelete("cascade"),
  ],
);

export const wallets = pgTable(
  "wallets",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    currentBalance: numeric("current_balance", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
  },
  (table) => [
    index("idx_wallets_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_wallets_user",
    }).onDelete("cascade"),
    unique("wallets_user_id_currency_key").on(table.currency, table.userId),
  ],
);

export const warehouses = pgTable("warehouses", {
  id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  location: jsonb(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userTiers = pgTable(
  "user_tiers",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 50 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: text(),
    priority: integer().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_user_tiers_priority").using(
      "btree",
      table.priority.asc().nullsLast().op("int4_ops"),
    ),
    unique("user_tiers_code_key").on(table.code),
  ],
);

export const attributeValues = pgTable(
  "attribute_values",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    attributeId: bigint("attribute_id", { mode: "number" }).notNull(),
    value: varchar({ length: 255 }).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
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

export const users = pgTable(
  "users",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    email: text().notNull(),
    birthday: date(),
    phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
    lastLogin: timestamp("last_login", { withTimezone: true, mode: "string" }),
    status: varchar({ length: 20 }).default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_users_created_at").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_users_status").using(
      "btree",
      table.status.asc().nullsLast().op("text_ops"),
    ),
    unique("users_email_key").on(table.email),
    unique("users_phone_number_key").on(table.phoneNumber),
  ],
);

export const wishlists = pgTable(
  "wishlists",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    name: varchar({ length: 255 }).default("Default").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_wishlists_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_wishlists_user",
    }).onDelete("cascade"),
  ],
);

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    wishlistId: bigint("wishlist_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }),
    addedAt: timestamp("added_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_wishlist_items_wishlist_id").using(
      "btree",
      table.wishlistId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.wishlistId],
      foreignColumns: [wishlists.id],
      name: "fk_wishlist_items_wishlist",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_wishlist_items_product",
    }),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_wishlist_items_variation",
    }),
    unique("wishlist_items_wishlist_id_product_id_variation_id_key").on(
      table.productId,
      table.variationId,
      table.wishlistId,
    ),
  ],
);

export const categoryTranslations = pgTable(
  "category_translations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryId: bigint("category_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 100 }).notNull(),
    description: text(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    metaKeywords: text("meta_keywords"),
  },
  (table) => [
    index("idx_category_translations_locale").using(
      "btree",
      table.locale.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "fk_category_translations_category",
    }).onDelete("cascade"),
    unique("category_translations_category_id_locale_key").on(
      table.categoryId,
      table.locale,
    ),
    unique("category_translations_locale_slug_key").on(
      table.locale,
      table.slug,
    ),
  ],
);

export const collections = pgTable(
  "collections",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    slug: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [unique("collections_slug_key").on(table.slug)],
);

export const giftCardTransactions = pgTable(
  "gift_card_transactions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    giftCardId: bigint("gift_card_id", { mode: "number" }).notNull(),
    type: varchar({ length: 20 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_gct_gift_card_id").using(
      "btree",
      table.giftCardId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.giftCardId],
      foreignColumns: [giftCards.id],
      name: "fk_gift_card_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_gift_card_order_id",
    }).onDelete("set null"),
  ],
);

export const locations = pgTable(
  "locations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    countryCode: varchar("country_code", { length: 2 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    provinceId: bigint("province_id", { mode: "number" }),
  },
  (table) => [
    foreignKey({
      columns: [table.provinceId],
      foreignColumns: [table.id],
      name: "fk_locations_province",
    }).onDelete("set null"),
  ],
);

export const mediaTranslations = pgTable(
  "media_translations",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    mediaId: bigint("media_id", { mode: "number" }).notNull(),
    locale: varchar({ length: 10 }).notNull(),
    altText: text("alt_text"),
    caption: text(),
  },
  (table) => [
    index("idx_media_translations_media_id").using(
      "btree",
      table.mediaId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.mediaId],
      foreignColumns: [media.id],
      name: "fk_media_translations_media",
    }).onDelete("cascade"),
    unique("media_translations_media_id_locale_key").on(
      table.locale,
      table.mediaId,
    ),
  ],
);

export const policyBindings = pgTable(
  "policy_bindings",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    policyId: bigint("policy_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    resourceId: bigint("resource_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    actionId: bigint("action_id", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_policy_bindings_action").using(
      "btree",
      table.actionId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_policy_bindings_policy").using(
      "btree",
      table.policyId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_policy_bindings_resource").using(
      "btree",
      table.resourceId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.policyId],
      foreignColumns: [policies.id],
      name: "fk_policy_bindings_policy",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.resourceId],
      foreignColumns: [abacResources.id],
      name: "fk_policy_bindings_resource",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.actionId],
      foreignColumns: [abacActions.id],
      name: "fk_policy_bindings_action",
    }).onDelete("cascade"),
    unique("policy_bindings_policy_id_resource_id_action_id_key").on(
      table.actionId,
      table.policyId,
      table.resourceId,
    ),
  ],
);

export const productBundleItems = pgTable(
  "product_bundle_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    bundleId: bigint("bundle_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variationId: bigint("variation_id", { mode: "number" }),
    quantity: integer().default(1).notNull(),
  },
  (table) => [
    index("idx_product_bundle_items_bundle_id").using(
      "btree",
      table.bundleId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.bundleId],
      foreignColumns: [productBundles.id],
      name: "fk_bundle_items_bundle",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_bundle_items_product",
    }),
    foreignKey({
      columns: [table.variationId],
      foreignColumns: [productVariations.id],
      name: "fk_bundle_items_variation",
    }),
  ],
);

export const refunds = pgTable(
  "refunds",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    paymentId: bigint("payment_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderItemId: bigint("order_item_id", { mode: "number" }),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    reason: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_refunds_order_item_id").using(
      "btree",
      table.orderItemId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_refunds_payment_id").using(
      "btree",
      table.paymentId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.paymentId],
      foreignColumns: [payments.id],
      name: "fk_refunds_payment",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_refunds_order_item",
    }).onDelete("set null"),
  ],
);

export const returnItems = pgTable(
  "return_items",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    returnId: bigint("return_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderItemId: bigint("order_item_id", { mode: "number" }).notNull(),
    quantity: integer().notNull(),
    condition: varchar({ length: 50 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_return_items_return_id").using(
      "btree",
      table.returnId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.returnId],
      foreignColumns: [returns.id],
      name: "fk_return_items_return",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderItemId],
      foreignColumns: [orderItems.id],
      name: "fk_return_items_order_item",
    }).onDelete("cascade"),
  ],
);

export const promotionTargets = pgTable(
  "promotion_targets",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    promotionId: bigint("promotion_id", { mode: "number" }).notNull(),
    targetType: varchar("target_type", { length: 50 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    targetId: bigint("target_id", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_promotion_targets_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_targets_promotion",
    }).onDelete("cascade"),
  ],
);

export const walletLedger = pgTable(
  "wallet_ledger",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    walletId: bigint("wallet_id", { mode: "number" }).notNull(),
    type: varchar({ length: 20 }).notNull(),
    sourceType: varchar("source_type", { length: 50 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    sourceId: bigint("source_id", { mode: "number" }),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_wallet_ledger_source").using(
      "btree",
      table.sourceType.asc().nullsLast().op("int8_ops"),
      table.sourceId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_wallet_ledger_wallet_id").using(
      "btree",
      table.walletId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.walletId],
      foreignColumns: [wallets.id],
      name: "fk_wallet_ledger_wallet",
    }).onDelete("cascade"),
    check(
      "chk_wallet_ledger_type",
      sql`(type)::text = ANY ((ARRAY['credit'::character varying, 'debit'::character varying, 'adjustment'::character varying])::text[])`,
    ),
    check(
      "chk_wallet_ledger_source_type",
      sql`(source_type)::text = ANY ((ARRAY['order'::character varying, 'refund'::character varying, 'gift_card'::character varying, 'manual'::character varying])::text[])`,
    ),
  ],
);

export const promotions = pgTable(
  "promotions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    code: varchar({ length: 100 }),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    type: varchar({ length: 50 }).notNull(),
    discountType: varchar("discount_type", { length: 20 }),
    discountValue: numeric("discount_value", { precision: 10, scale: 2 }),
    maxDiscountValue: numeric("max_discount_value", {
      precision: 10,
      scale: 2,
    }),
    usageLimit: integer("usage_limit"),
    usageLimitPerUser: integer("usage_limit_per_user"),
    startsAt: timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: boolean("is_active").default(true).notNull(),
    isStackable: boolean("is_stackable").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_promotions_active_time").using(
      "btree",
      table.isActive.asc().nullsLast().op("bool_ops"),
      table.startsAt.asc().nullsLast().op("bool_ops"),
      table.endsAt.asc().nullsLast().op("bool_ops"),
    ),
    unique("promotions_code_key").on(table.code),
  ],
);

export const promotionConditions = pgTable(
  "promotion_conditions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    promotionId: bigint("promotion_id", { mode: "number" }).notNull(),
    conditionJson: jsonb("condition_json").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_promotion_conditions_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_conditions_promotion",
    }).onDelete("cascade"),
  ],
);

export const promotionActions = pgTable(
  "promotion_actions",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    promotionId: bigint("promotion_id", { mode: "number" }).notNull(),
    actionType: varchar("action_type", { length: 50 }).notNull(),
    actionJson: jsonb("action_json").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_promotion_actions_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_actions_promotion",
    }).onDelete("cascade"),
  ],
);

export const promotionUsage = pgTable(
  "promotion_usage",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    promotionId: bigint("promotion_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }),
    usedAt: timestamp("used_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_promotion_usage_promotion").using(
      "btree",
      table.promotionId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_promotion_usage_user").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_usage_promotion",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_promotion_usage_user",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_promotion_usage_order",
    }).onDelete("set null"),
  ],
);

export const promotionCampaigns = pgTable(
  "promotion_campaigns",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    code: varchar({ length: 100 }).notNull(),
    description: text(),
    startsAt: timestamp("starts_at", { withTimezone: true, mode: "string" }),
    endsAt: timestamp("ends_at", { withTimezone: true, mode: "string" }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("promotion_campaigns_code_key").on(table.code)],
);

export const campaignProducts = pgTable(
  "campaign_products",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    campaignId: bigint("campaign_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [campaigns.id],
      name: "fk_campaign_products_campaign",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_campaign_products_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.campaignId, table.productId],
      name: "campaign_products_pkey",
    }),
  ],
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    roleId: bigint("role_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    permissionId: bigint("permission_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_role_permissions_role",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.permissionId],
      foreignColumns: [permissions.id],
      name: "fk_role_permissions_permission",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.permissionId, table.roleId],
      name: "role_permissions_pkey",
    }),
  ],
);

export const userRoles = pgTable(
  "user_roles",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    roleId: bigint("role_id", { mode: "number" }).notNull(),
  },
  (table) => [
    index("idx_user_roles_role_id").using(
      "btree",
      table.roleId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_user_roles_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_roles_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "fk_user_roles_role",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.roleId, table.userId],
      name: "user_roles_pkey",
    }),
  ],
);

export const promotionCampaignLinks = pgTable(
  "promotion_campaign_links",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    campaignId: bigint("campaign_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    promotionId: bigint("promotion_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [promotionCampaigns.id],
      name: "fk_promotion_campaign_links_campaign",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.promotionId],
      foreignColumns: [promotions.id],
      name: "fk_promotion_campaign_links_promotion",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.campaignId, table.promotionId],
      name: "promotion_campaign_links_pkey",
    }),
  ],
);

export const collectionProducts = pgTable(
  "collection_products",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    collectionId: bigint("collection_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    position: integer().default(0).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "fk_collection_products_collection",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_collection_products_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.collectionId, table.productId],
      name: "collection_products_pkey",
    }),
  ],
);

export const favorites = pgTable(
  "favorites",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_favorites_user",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_favorites_product",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.productId, table.userId],
      name: "favorites_pkey",
    }),
  ],
);
