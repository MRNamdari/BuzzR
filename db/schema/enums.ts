import { pgEnum } from "drizzle-orm/pg-core";

export const CurrencyEnum = pgEnum("currency", [
  "IRR", // Iranian Rial
  "USD", // US Dollar
  "EUR", // Euro
  "GBP", // British Pound
  "CAD", // Canadian Dollar
  "AUD", // Australian Dollar
  "DHS", // UAE Dirham
  "JPY", // Japanese Yen
  "CNY", // Chinese Yuan
  "INR", // Indian Rupee
  "TRY", // Turkish Lira
  "RUB", // Russian Ruble
  "AFN", // Afghan Afghani
  "PKR", // Pakistani Rupee
  "UZS", // Uzbekistani Som
  "AZN", // Azerbaijani Manat
  "TMT", // Turkmenistani Manat
  "GEL", // Georgian Lari
  "KZT", // Kazakhstani Tenge
  "TJS", // Tajikistani Somoni
  "YER", // Yemeni Rial
  "LBP", // Lebanese Pound
  "SYP", // Syrian Pound
  "IQD", // Iraqi Dinar
  "QAR", // Qatari Riyal
  "BHD", // Bahraini Dinar
  "OMR", // Omani Rial
  "KWD", // Kuwaiti Dinar
  "SAR", // Saudi Riyal
]);

export const ProductTypeEnum = pgEnum("product_type", ["simple", "variable"]);
export const AvailabilityStatusEnum = pgEnum("product_availability_status", [
  "available",
  "preorder",
  "presale",
  "coming_soon",
  "call_to_order",
  "out_of_stock",
  "discontinued",
]);
export const PublishStatusEnum = pgEnum("product_publish_status", [
  "draft",
  "published",
]);

export const ProductRelationTypeEnum = pgEnum("product_relation_type", [
  "upsell",
  "cross-sell",
]);

export const MediaTypeEnum = pgEnum("media_type", ["image", "video", "3d"]);

export const EntityTypeEnum = pgEnum("entity_type", [
  "category",
  "collection",
  "product",
  "product_variant",
]);

export const AttributeTypeEnum = pgEnum("attribute_type", [
  "text",
  "number",
  "boolean",
]);

export const AddressTypeEnum = pgEnum("address_type", [
  "billing",
  "shipping",
  "both",
]);

export const WalletLedgerTypeEnum = pgEnum("wallet_ledger_type", [
  "credit",
  "debit",
  "adjustment",
]);

export const WalletLedgerSourceTypeEnum = pgEnum("wallet_ledger_source_type", [
  "order",
  "gift_card",
  "refund",
  "manual",
]);

export const PolicyEffectEnum = pgEnum("policy_effect", ["allow", "deny"]);
