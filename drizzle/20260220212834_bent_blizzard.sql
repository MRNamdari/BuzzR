CREATE TABLE "attribute_values" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"attribute_id" bigint NOT NULL,
	"value" varchar(255) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "attribute_values_attribute_id_value_key" UNIQUE("attribute_id","value")
);
--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "attributes_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"parent_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "category_translations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"category_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" text,
	CONSTRAINT "category_translations_category_id_locale_key" UNIQUE("category_id","locale"),
	CONSTRAINT "category_translations_locale_slug_key" UNIQUE("locale","slug")
);
--> statement-breakpoint
CREATE TABLE "collection_products" (
	"collection_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "collection_products_pkey" PRIMARY KEY("collection_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "collection_translations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"collection_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	CONSTRAINT "collection_translations_collection_id_locale_key" UNIQUE("collection_id","locale")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "collections_slug_key" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_attribute_values" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint,
	"variation_id" bigint,
	"attribute_id" bigint NOT NULL,
	"attribute_value_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_bundle_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"bundle_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"variation_id" bigint,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_bundles" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"is_dynamic" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_inventory" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"variation_id" bigint NOT NULL,
	"warehouse_id" bigint,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"stock_reserved" integer DEFAULT 0 NOT NULL,
	"stock_threshold" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_inventory_variation_id_warehouse_id_key" UNIQUE("variation_id","warehouse_id"),
	CONSTRAINT "chk_stock_quantity_non_negative" CHECK (stock_quantity >= 0),
	CONSTRAINT "chk_stock_reserved_non_negative" CHECK (stock_reserved >= 0),
	CONSTRAINT "chk_stock_threshold_non_negative" CHECK (stock_threshold >= 0),
	CONSTRAINT "chk_stock_reserved_not_exceed_quantity" CHECK (stock_reserved <= stock_quantity)
);
--> statement-breakpoint
CREATE TABLE "product_price_history" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"variation_id" bigint NOT NULL,
	"currency" varchar(3) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"valid_from" timestamp with time zone DEFAULT now() NOT NULL,
	"valid_to" timestamp with time zone,
	CONSTRAINT "chk_valid_to" CHECK ((valid_to IS NULL) OR (valid_to > valid_from))
);
--> statement-breakpoint
CREATE TABLE "product_prices" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"variation_id" bigint NOT NULL,
	"currency" varchar(3) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	CONSTRAINT "product_prices_variation_id_currency_key" UNIQUE("currency","variation_id")
);
--> statement-breakpoint
CREATE TABLE "product_purchase_prices" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"variation_id" bigint NOT NULL,
	"supplier_id" bigint,
	"currency" varchar(3) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"valid_from" timestamp with time zone DEFAULT now() NOT NULL,
	"valid_to" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "product_relations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"related_product_id" bigint NOT NULL,
	"relation_type" varchar(20) NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "product_relations_product_id_related_product_id_relation_ty_key" UNIQUE("product_id","related_product_id","relation_type")
);
--> statement-breakpoint
CREATE TABLE "product_shipping_rules" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"shipping_method_id" bigint,
	"is_excluded" boolean DEFAULT false NOT NULL,
	"extra_fee" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "product_status_history" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"old_publish_status" varchar(20),
	"new_publish_status" varchar(20),
	"old_availability_status" varchar(20),
	"new_availability_status" varchar(20),
	"changed_by" bigint,
	"changed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_translations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"short_description" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" text,
	CONSTRAINT "product_translations_product_id_locale_key" UNIQUE("locale","product_id"),
	CONSTRAINT "product_translations_locale_slug_key" UNIQUE("locale","slug")
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"sku" varchar(100),
	"name" varchar(255),
	"base_price" numeric(10, 2) NOT NULL,
	"availability_status" varchar(20) DEFAULT 'available' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "product_variants_sku_key" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "product_versions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"product_id" bigint NOT NULL,
	"version_number" integer NOT NULL,
	"data_snapshot" jsonb NOT NULL,
	"created_by" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_versions_product_id_version_number_key" UNIQUE("product_id","version_number")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"category_id" bigint,
	"product_type" varchar(20) DEFAULT 'simple' NOT NULL,
	"availability_status" varchar(20) DEFAULT 'available' NOT NULL,
	"available_from" timestamp with time zone,
	"base_currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"base_price" numeric(10, 2) NOT NULL,
	"tax_class_id" bigint,
	"publish_status" varchar(20) DEFAULT 'draft' NOT NULL,
	"publish_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_metadata" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" text,
	"og_title" varchar(255),
	"og_description" text,
	"og_image_url" text,
	CONSTRAINT "seo_metadata_entity_type_entity_id_locale_key" UNIQUE("entity_id","entity_type","locale")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_pkey" PRIMARY KEY("product_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "review_votes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"review_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"is_helpful" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "review_votes_review_id_user_id_key" UNIQUE("review_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"order_id" bigint,
	"rating" integer NOT NULL,
	"title" varchar(255),
	"body" text,
	"is_approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_rating_check" CHECK ((rating >= 1) AND (rating <= 5))
);
--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"type" varchar(20) NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"full_name" varchar(200),
	"line1" varchar(255) NOT NULL,
	"line2" varchar(255),
	"city" bigint NOT NULL,
	"state" bigint NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"country" varchar(2) NOT NULL,
	"receiver_name" varchar(100) DEFAULT NULL,
	"receiver_phone" varchar(15) DEFAULT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_address_type" CHECK ((type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying, 'both'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "user_attributes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"key" varchar(100) NOT NULL,
	"value_text" text,
	"value_num" numeric(20, 4),
	"value_bool" boolean,
	"value_json" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_user_attributes_value" CHECK (((value_text IS NOT NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NOT NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NOT NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NOT NULL)))
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" bigint NOT NULL,
	"role_id" bigint NOT NULL,
	CONSTRAINT "user_roles_pkey" PRIMARY KEY("role_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "user_tier_assignments" (
	"user_id" bigint PRIMARY KEY NOT NULL,
	"tier_id" bigint NOT NULL,
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "user_tiers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"priority" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_tiers_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"birthday" date,
	"phone_number" varchar(15) NOT NULL,
	"last_login" timestamp with time zone,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_phone_number_key" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "wallet_ledger" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"wallet_id" bigint NOT NULL,
	"type" varchar(20) NOT NULL,
	"source_type" varchar(50) NOT NULL,
	"source_id" bigint,
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_wallet_ledger_type" CHECK ((type)::text = ANY ((ARRAY['credit'::character varying, 'debit'::character varying, 'adjustment'::character varying])::text[])),
	CONSTRAINT "chk_wallet_ledger_source_type" CHECK ((source_type)::text = ANY ((ARRAY['order'::character varying, 'refund'::character varying, 'gift_card'::character varying, 'manual'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"currency" varchar(3) NOT NULL,
	"current_balance" numeric(10, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "wallets_user_id_currency_key" UNIQUE("currency","user_id")
);
--> statement-breakpoint
CREATE TABLE "wishlist_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"wishlist_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"variation_id" bigint,
	"added_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "wishlist_items_wishlist_id_product_id_variant_id_key" UNIQUE("product_id","variation_id","wishlist_id")
);
--> statement-breakpoint
CREATE TABLE "wishlists" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"name" varchar(255) DEFAULT 'Default' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"country_code" varchar(2) NOT NULL,
	"name" varchar(100) NOT NULL,
	"province_id" bigint
);
--> statement-breakpoint
CREATE TABLE "shipping_methods" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"zone_id" bigint,
	"name" varchar(255) NOT NULL,
	"code" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"base_price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"price_per_kg" numeric(10, 2) DEFAULT '0' NOT NULL,
	"min_order_total" numeric(10, 2),
	"max_order_total" numeric(10, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shipping_methods_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "shipping_zones" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"countries" text[],
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"contact_info" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaign_products" (
	"campaign_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	CONSTRAINT "campaign_products_pkey" PRIMARY KEY("campaign_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "campaigns_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "promotion_actions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"promotion_id" bigint NOT NULL,
	"action_type" varchar(50) NOT NULL,
	"action_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotion_campaign_links" (
	"campaign_id" bigint NOT NULL,
	"promotion_id" bigint NOT NULL,
	CONSTRAINT "promotion_campaign_links_pkey" PRIMARY KEY("campaign_id","promotion_id")
);
--> statement-breakpoint
CREATE TABLE "promotion_campaigns" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(100) NOT NULL,
	"description" text,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "promotion_campaigns_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "promotion_conditions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"promotion_id" bigint NOT NULL,
	"condition_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotion_targets" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"promotion_id" bigint NOT NULL,
	"target_type" varchar(50) NOT NULL,
	"target_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotion_usage" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"promotion_id" bigint NOT NULL,
	"user_id" bigint,
	"order_id" bigint,
	"used_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100),
	"name" varchar(255) NOT NULL,
	"description" text,
	"type" varchar(50) NOT NULL,
	"discount_type" varchar(20),
	"discount_value" numeric(10, 2),
	"max_discount_value" numeric(10, 2),
	"usage_limit" integer,
	"usage_limit_per_user" integer,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_stackable" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "promotions_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"type" varchar(20) NOT NULL,
	"mime_type" varchar(100),
	"file_size" bigint,
	"width" integer,
	"height" integer,
	"duration" numeric(10, 2),
	"checksum" varchar(255),
	"metadata" jsonb,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_relations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"media_id" bigint NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" bigint NOT NULL,
	"role" varchar(50) DEFAULT 'gallery' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_set_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"media_set_id" bigint NOT NULL,
	"media_id" bigint NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "media_set_items_media_set_id_media_id_key" UNIQUE("media_id","media_set_id")
);
--> statement-breakpoint
CREATE TABLE "media_sets" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_tags" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"media_id" bigint NOT NULL,
	"tag" varchar(100) NOT NULL,
	"value" varchar(255) NOT NULL,
	CONSTRAINT "media_tags_media_id_tag_value_key" UNIQUE("media_id","tag","value")
);
--> statement-breakpoint
CREATE TABLE "media_translations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"media_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"alt_text" text,
	"caption" text,
	CONSTRAINT "media_translations_media_id_locale_key" UNIQUE("locale","media_id")
);
--> statement-breakpoint
CREATE TABLE "media_versions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"media_id" bigint NOT NULL,
	"version_number" integer NOT NULL,
	"data_snapshot" jsonb NOT NULL,
	"created_by" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_versions_media_id_version_number_key" UNIQUE("media_id","version_number")
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"session_id" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"cart_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"variant_id" bigint,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(12, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gift_card_transactions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"gift_card_id" bigint NOT NULL,
	"type" varchar(20) NOT NULL,
	"order_id" bigint,
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gift_cards" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100) NOT NULL,
	"initial_balance" numeric(10, 2) NOT NULL,
	"current_balance" numeric(10, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"expires_at" timestamp with time zone,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "gift_cards_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"variation_id" bigint,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"purchase_price" numeric(10, 2),
	"tax_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"discount_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"status" varchar(20) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"subtotal_amount" numeric(10, 2) NOT NULL,
	"tax_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"shipping_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"discount_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"billing_address_id" bigint,
	"shipping_address_id" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"provider" varchar(50) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"status" varchar(20) NOT NULL,
	"external_reference" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refunds" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"payment_id" bigint NOT NULL,
	"order_item_id" bigint,
	"amount" numeric(10, 2) NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "return_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"return_id" bigint NOT NULL,
	"order_item_id" bigint NOT NULL,
	"quantity" integer NOT NULL,
	"condition" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "returns" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"status" varchar(20) NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"carrier" varchar(100),
	"tracking_number" varchar(255),
	"status" varchar(20) NOT NULL,
	"shipped_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipment_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"shipment_id" bigint NOT NULL,
	"order_item_id" bigint NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "abac_actions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "abac_actions_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "abac_resources" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "abac_resources_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	CONSTRAINT "permissions_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "policies" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"type" varchar(50) NOT NULL,
	"effect" varchar(20) NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"condition_json" jsonb NOT NULL,
	"payload_json" jsonb,
	"valid_from" timestamp with time zone,
	"valid_to" timestamp with time zone,
	"campaign_id" bigint,
	"applies_to_subject" jsonb,
	"applies_to_resource" jsonb,
	"applies_to_context" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "policy_bindings" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"policy_id" bigint NOT NULL,
	"resource_id" bigint NOT NULL,
	"action_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "policy_bindings_policy_id_resource_id_action_id_key" UNIQUE("action_id","policy_id","resource_id")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" bigint NOT NULL,
	"permission_id" bigint NOT NULL,
	CONSTRAINT "role_permissions_pkey" PRIMARY KEY("permission_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" bigserial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles_translations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"role_id" bigint NOT NULL,
	"locale" varchar(10) NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	CONSTRAINT "roles_translations_role_id_locale_key" UNIQUE("locale","role_id")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"actor_user_id" bigint,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" bigint,
	"action" varchar(50) NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attribute_values" ADD CONSTRAINT "fk_attribute_values_attribute" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "fk_categories_parent" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_translations" ADD CONSTRAINT "fk_category_translations_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "fk_collection_products_collection" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "fk_collection_products_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_translations" ADD CONSTRAINT "fk_collection_translations_collection" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "fk_product_attribute_values_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "fk_product_attribute_values_variant" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "fk_product_attribute_values_attribute" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "fk_product_attribute_values_attribute_value" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."attribute_values"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "fk_bundle_items_bundle" FOREIGN KEY ("bundle_id") REFERENCES "public"."product_bundles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "fk_bundle_items_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "fk_bundle_items_variant" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundles" ADD CONSTRAINT "fk_product_bundles_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_inventory" ADD CONSTRAINT "fk_product_inventory_variant" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_inventory" ADD CONSTRAINT "fk_product_inventory_warehouse" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_price_history" ADD CONSTRAINT "fk_product_price_history_variants_id" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_prices" ADD CONSTRAINT "fk_product_prices_variant_id" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_purchase_prices" ADD CONSTRAINT "fk_product_purchase_prices_variants_id" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_purchase_prices" ADD CONSTRAINT "fk_product_purchase_prices_supplier_id" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "fk_product_relations_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "fk_product_relations_related" FOREIGN KEY ("related_product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_shipping_rules" ADD CONSTRAINT "fk_product_shipping_rules_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_shipping_rules" ADD CONSTRAINT "fk_product_shipping_rules_method" FOREIGN KEY ("shipping_method_id") REFERENCES "public"."shipping_methods"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_status_history" ADD CONSTRAINT "fk_product_status_history_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_status_history" ADD CONSTRAINT "fk_product_status_history_user" FOREIGN KEY ("changed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_translations" ADD CONSTRAINT "fk_product_translations_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "fk_product_variants_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_versions" ADD CONSTRAINT "fk_product_versions_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_versions" ADD CONSTRAINT "fk_product_versions_user" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "fk_products_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "fk_favorites_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "fk_favorites_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_votes" ADD CONSTRAINT "fk_review_votes_review" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_votes" ADD CONSTRAINT "fk_review_votes_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "fk_user_addresses_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "fk_user_addresses_city" FOREIGN KEY ("city") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "fk_user_addresses_state" FOREIGN KEY ("state") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_attributes" ADD CONSTRAINT "fk_user_attributes_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "fk_user_roles_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "fk_user_roles_role" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tier_assignments" ADD CONSTRAINT "fk_user_tier_assignments_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tier_assignments" ADD CONSTRAINT "fk_user_tier_assignments_tier" FOREIGN KEY ("tier_id") REFERENCES "public"."user_tiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_ledger" ADD CONSTRAINT "fk_wallet_ledger_wallet" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "fk_wallets_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "fk_wishlist_items_wishlist" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "fk_wishlist_items_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "fk_wishlist_items_variation" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "fk_wishlists_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "fk_locations_province" FOREIGN KEY ("province_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_methods" ADD CONSTRAINT "fk_shipping_methods_zone" FOREIGN KEY ("zone_id") REFERENCES "public"."shipping_zones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_products" ADD CONSTRAINT "fk_campaign_products_campaign" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_products" ADD CONSTRAINT "fk_campaign_products_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_actions" ADD CONSTRAINT "fk_promotion_actions_promotion" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" ADD CONSTRAINT "fk_promotion_campaign_links_campaign" FOREIGN KEY ("campaign_id") REFERENCES "public"."promotion_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" ADD CONSTRAINT "fk_promotion_campaign_links_promotion" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_conditions" ADD CONSTRAINT "fk_promotion_conditions_promotion" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_targets" ADD CONSTRAINT "fk_promotion_targets_promotion" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "fk_promotion_usage_promotion" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "fk_promotion_usage_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "fk_promotion_usage_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_relations" ADD CONSTRAINT "fk_media_relations_media" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_set_items" ADD CONSTRAINT "fk_media_set_items_set" FOREIGN KEY ("media_set_id") REFERENCES "public"."media_sets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_set_items" ADD CONSTRAINT "fk_media_set_items_media" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_tags" ADD CONSTRAINT "fk_media_tags_media" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_translations" ADD CONSTRAINT "fk_media_translations_media" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_versions" ADD CONSTRAINT "fk_media_versions_media" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_versions" ADD CONSTRAINT "fk_media_versions_user" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "fk_carts_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "fk_cart_items_card" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "fk_cart_items_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "fk_cart_items_variant" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift_card_transactions" ADD CONSTRAINT "fk_gift_card_id" FOREIGN KEY ("gift_card_id") REFERENCES "public"."gift_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift_card_transactions" ADD CONSTRAINT "fk_gift_card_order_id" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_variant" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_billing_address" FOREIGN KEY ("billing_address_id") REFERENCES "public"."user_addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_shipping_address" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."user_addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "fk_payments_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "fk_refunds_payment" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "fk_refunds_order_item" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "return_items" ADD CONSTRAINT "fk_return_items_return" FOREIGN KEY ("return_id") REFERENCES "public"."returns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "return_items" ADD CONSTRAINT "fk_return_items_order_item" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "returns" ADD CONSTRAINT "fk_returns_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "fk_order_id" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "fk_order_item_id" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "fk_shipment_id" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "fk_policies_campaign" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "fk_policy_bindings_policy" FOREIGN KEY ("policy_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "fk_policy_bindings_resource" FOREIGN KEY ("resource_id") REFERENCES "public"."abac_resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "fk_policy_bindings_action" FOREIGN KEY ("action_id") REFERENCES "public"."abac_actions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions_role" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "fk_role_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_translations" ADD CONSTRAINT "fk_role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "fk_audit_logs_actor" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_attribute_values_attribute_id" ON "attribute_values" USING btree ("attribute_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_categories_parent_id" ON "categories" USING btree ("parent_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_category_translations_locale" ON "category_translations" USING btree ("locale" text_ops);--> statement-breakpoint
CREATE INDEX "idx_pav_attribute_id" ON "product_attribute_values" USING btree ("attribute_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_pav_product_id" ON "product_attribute_values" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_pav_variation_id" ON "product_attribute_values" USING btree ("variation_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_bundle_items_bundle_id" ON "product_bundle_items" USING btree ("bundle_id" int8_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "uq_product_bundles_product_id" ON "product_bundles" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_inventory_variation_id" ON "product_inventory" USING btree ("variation_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_inventory_warehouse_id" ON "product_inventory" USING btree ("warehouse_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_pph_valid_from_to" ON "product_price_history" USING btree ("valid_from" timestamptz_ops,"valid_to" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_pph_variation_currency" ON "product_price_history" USING btree ("variation_id","currency");--> statement-breakpoint
CREATE INDEX "idx_product_prices_variation_currency" ON "product_prices" USING btree ("variation_id","currency");--> statement-breakpoint
CREATE INDEX "idx_ppp_valid_from_to" ON "product_purchase_prices" USING btree ("valid_from" timestamptz_ops,"valid_to" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_ppp_variation_currency" ON "product_purchase_prices" USING btree ("variation_id","currency");--> statement-breakpoint
CREATE INDEX "idx_product_relations_product" ON "product_relations" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_status_history_product" ON "product_status_history" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_translations_locale" ON "product_translations" USING btree ("locale" text_ops);--> statement-breakpoint
CREATE INDEX "idx_product_variants_product_id" ON "product_variants" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_product_versions_product_id" ON "product_versions" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_products_availability_status" ON "products" USING btree ("availability_status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_products_deleted_at" ON "products" USING btree ("deleted_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_products_publish_status" ON "products" USING btree ("publish_status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_products_type" ON "products" USING btree ("product_type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_seo_metadata_entity" ON "seo_metadata" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "idx_reviews_product_id" ON "reviews" USING btree ("product_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_reviews_user_id" ON "reviews" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_user_addresses_type" ON "user_addresses" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_addresses_user_id" ON "user_addresses" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_user_attributes_key" ON "user_attributes" USING btree ("key" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_attributes_key_bool" ON "user_attributes" USING btree ("key" text_ops,"value_bool" bool_ops) WHERE (value_bool IS NOT NULL);--> statement-breakpoint
CREATE INDEX "idx_user_attributes_key_num" ON "user_attributes" USING btree ("key" text_ops,"value_num" numeric_ops) WHERE (value_num IS NOT NULL);--> statement-breakpoint
CREATE INDEX "idx_user_attributes_key_text" ON "user_attributes" USING btree ("key" text_ops,"value_text" text_ops) WHERE (value_text IS NOT NULL);--> statement-breakpoint
CREATE UNIQUE INDEX "uq_user_attributes_user_key" ON "user_attributes" USING btree ("user_id","key");--> statement-breakpoint
CREATE INDEX "idx_user_roles_role_id" ON "user_roles" USING btree ("role_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_user_roles_user_id" ON "user_roles" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_user_tier_assignments_expires_at" ON "user_tier_assignments" USING btree ("expires_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_user_tier_assignments_tier_id" ON "user_tier_assignments" USING btree ("tier_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_user_tiers_priority" ON "user_tiers" USING btree ("priority" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_users_created_at" ON "users" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_users_status" ON "users" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_wallet_ledger_source" ON "wallet_ledger" USING btree ("source_type","source_id");--> statement-breakpoint
CREATE INDEX "idx_wallet_ledger_wallet_id" ON "wallet_ledger" USING btree ("wallet_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_wallets_user_id" ON "wallets" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_wishlist_items_wishlist_id" ON "wishlist_items" USING btree ("wishlist_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_wishlists_user_id" ON "wishlists" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_campaigns_active_time" ON "campaigns" USING btree ("is_active","starts_at","ends_at");--> statement-breakpoint
CREATE INDEX "idx_promotion_actions_promotion" ON "promotion_actions" USING btree ("promotion_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_promotion_conditions_promotion" ON "promotion_conditions" USING btree ("promotion_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_promotion_targets_promotion" ON "promotion_targets" USING btree ("promotion_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_promotion_usage_promotion" ON "promotion_usage" USING btree ("promotion_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_promotion_usage_user" ON "promotion_usage" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_promotions_active_time" ON "promotions" USING btree ("is_active","starts_at","ends_at");--> statement-breakpoint
CREATE INDEX "idx_media_checksum" ON "media" USING btree ("checksum" text_ops);--> statement-breakpoint
CREATE INDEX "idx_media_deleted_at" ON "media" USING btree ("deleted_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_media_type" ON "media" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_media_relations_entity" ON "media_relations" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "idx_media_relations_media_id" ON "media_relations" USING btree ("media_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_media_tags_media_id" ON "media_tags" USING btree ("media_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_media_translations_media_id" ON "media_translations" USING btree ("media_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_carts_user" ON "carts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_carts_session" ON "carts" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_cart_items_cart" ON "cart_items" USING btree ("cart_id");--> statement-breakpoint
CREATE INDEX "idx_cart_items_product" ON "cart_items" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "idx_gct_gift_card_id" ON "gift_card_transactions" USING btree ("gift_card_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_gift_cards_expires_at" ON "gift_cards" USING btree ("expires_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_gift_cards_status" ON "gift_cards" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_order_items_order_id" ON "order_items" USING btree ("order_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_orders_created_at" ON "orders" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_orders_status" ON "orders" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_orders_user_id" ON "orders" USING btree ("user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_payments_order_id" ON "payments" USING btree ("order_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_payments_status" ON "payments" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_refunds_order_item_id" ON "refunds" USING btree ("order_item_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_refunds_payment_id" ON "refunds" USING btree ("payment_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_return_items_return_id" ON "return_items" USING btree ("return_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_returns_order_id" ON "returns" USING btree ("order_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_shipments_order_id" ON "shipments" USING btree ("order_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_shipment_items_shipment_id" ON "shipment_items" USING btree ("shipment_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_abac_actions_code" ON "abac_actions" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_abac_resources_code" ON "abac_resources" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_policies_active_time" ON "policies" USING btree ("is_active","valid_from","valid_to");--> statement-breakpoint
CREATE INDEX "idx_policies_condition_json_gin" ON "policies" USING gin ("condition_json" jsonb_ops);--> statement-breakpoint
CREATE INDEX "idx_policies_payload_json_gin" ON "policies" USING gin ("payload_json" jsonb_ops);--> statement-breakpoint
CREATE INDEX "idx_policies_type" ON "policies" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_policy_bindings_action" ON "policy_bindings" USING btree ("action_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_policy_bindings_policy" ON "policy_bindings" USING btree ("policy_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_policy_bindings_resource" ON "policy_bindings" USING btree ("resource_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_audit_logs_actor" ON "audit_logs" USING btree ("actor_user_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_audit_logs_entity" ON "audit_logs" USING btree ("entity_type","entity_id");