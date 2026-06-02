import { Migration } from "@mikro-orm/migrations";

export class Migration20260514121537 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create type "attribute_type" as enum ('text', 'number', 'boolean');`,
    );
    this.addSql(`create type "media_type" as enum ('image', 'video', '3d');`);
    this.addSql(
      `create type "entity_type" as enum ('category', 'collection', 'product', 'product_variant');`,
    );
    this.addSql(`create type "policy_effect" as enum ('allow', 'deny');`);
    this.addSql(`create type "product_type" as enum ('simple', 'variable');`);
    this.addSql(
      `create type "product_availability_status" as enum ('available', 'preorder', 'presale', 'coming_soon', 'call_to_order', 'out_of_stock', 'discontinued');`,
    );
    this.addSql(
      `create type "currency" as enum ('IRR', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'DHS', 'JPY', 'CNY', 'INR', 'TRY', 'RUB', 'AFN', 'PKR', 'UZS', 'AZN', 'TMT', 'GEL', 'KZT', 'TJS', 'YER', 'LBP', 'SYP', 'IQD', 'QAR', 'BHD', 'OMR', 'KWD', 'SAR');`,
    );
    this.addSql(
      `create type "product_publish_status" as enum ('draft', 'published');`,
    );
    this.addSql(
      `create type "product_relation_type" as enum ('upsell', 'cross-sell');`,
    );
    this.addSql(
      `create type "address_type" as enum ('billing', 'shipping', 'both');`,
    );
    this.addSql(
      `create type "wallet_ledger_type" as enum ('credit', 'debit', 'adjustment');`,
    );
    this.addSql(
      `create type "wallet_ledger_source_type" as enum ('order', 'gift_card', 'refund', 'manual');`,
    );
    this.addSql(
      `create table "abac_actions" ("id" bigserial primary key, "code" varchar(100) not null, "description" text null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_abac_actions_code" on "abac_actions" ("code");`,
    );
    this.addSql(
      `alter table "abac_actions" add constraint "abac_actions_code_key" unique ("code");`,
    );

    this.addSql(
      `create table "abac_resources" ("id" bigserial primary key, "code" varchar(100) not null, "description" text null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_abac_resources_code" on "abac_resources" ("code");`,
    );
    this.addSql(
      `alter table "abac_resources" add constraint "abac_resources_code_key" unique ("code");`,
    );

    this.addSql(
      `create table "attributes" ("id" bigserial primary key, "code" varchar(100) not null, "name" varchar(100) not null, "type" "attribute_type" not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "attributes" add constraint "attributes_code_key" unique ("code");`,
    );

    this.addSql(
      `create table "attribute_values" ("id" bigserial primary key, "attribute_id" bigint not null, "value" varchar(255) not null, "sort_order" int not null default 0);`,
    );
    this.addSql(
      `create index "idx_attribute_values_attribute_id" on "attribute_values" ("attribute_id");`,
    );
    this.addSql(
      `alter table "attribute_values" add constraint "attribute_values_attribute_id_value_key" unique ("attribute_id", "value");`,
    );

    this.addSql(
      `create table "campaigns" ("id" bigserial primary key, "code" varchar(100) not null, "name" varchar(255) not null, "description" text null, "starts_at" timestamptz null, "ends_at" timestamptz null, "is_active" boolean not null default true, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "campaigns" add constraint "campaigns_code_key" unique ("code");`,
    );
    this.addSql(
      `create index "idx_campaigns_active_time" on "campaigns" ("is_active", "starts_at", "ends_at");`,
    );

    this.addSql(
      `create table "categories" ("id" bigserial primary key, "parent_id" bigint null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null);`,
    );
    this.addSql(
      `create index "idx_categories_parent_id" on "categories" ("parent_id");`,
    );

    this.addSql(
      `create table "collections" ("id" bigserial primary key, "slug" varchar(255) not null, "created_at" timestamptz not null default now(), "deleted_at" timestamptz null);`,
    );
    this.addSql(
      `alter table "collections" add constraint "collections_slug_key" unique ("slug");`,
    );

    this.addSql(
      `create table "gift_cards" ("id" bigserial primary key, "code" varchar(100) not null, "initial_balance" numeric(10,0) not null, "current_balance" numeric(10,0) not null, "currency" varchar(3) not null, "expires_at" timestamptz null, "status" varchar(20) not null default 'active', "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "gift_cards" add constraint "gift_cards_code_key" unique ("code");`,
    );
    this.addSql(
      `create index "idx_gift_cards_expires_at" on "gift_cards" ("expires_at");`,
    );
    this.addSql(
      `create index "idx_gift_cards_status" on "gift_cards" ("status");`,
    );

    this.addSql(
      `create table "languages" ("id" bigserial primary key, "name" varchar(255) not null, "code" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "languages" add constraint "languages_code_unique" unique ("code");`,
    );

    this.addSql(
      `create table "collection_translations" ("id" bigserial primary key, "collection_id" bigint not null, "lang_id" bigint not null, "name" varchar(255) not null, "description" text null);`,
    );
    this.addSql(
      `alter table "collection_translations" add constraint "collection_translations_collection_id_lang_key" unique ("collection_id", "lang_id");`,
    );

    this.addSql(
      `create table "category_translations" ("id" bigserial primary key, "category_id" bigint not null, "lang_id" bigint not null, "name" varchar(100) not null, "slug" varchar(100) not null, "description" text null, "meta_title" varchar(255) null, "meta_description" text null, "meta_keywords" text null);`,
    );
    this.addSql(
      `alter table "category_translations" add constraint "category_translations_category_id_lang_key" unique ("category_id", "lang_id");`,
    );
    this.addSql(
      `alter table "category_translations" add constraint "category_translations_lang_slug_key" unique ("lang_id", "slug");`,
    );

    this.addSql(
      `create table "locations" ("id" bigserial primary key, "country_code" varchar(2) not null, "name" varchar(100) not null, "province_id" bigint null);`,
    );

    this.addSql(
      `create table "media" ("id" bigserial primary key, "url" text not null, "type" "media_type" not null, "mime_type" varchar(100) null, "file_size" bigint null, "width" int null, "height" int null, "duration" numeric(10,0) null, "checksum" varchar(255) null, "metadata" jsonb null, "deleted_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(`create index "idx_media_type" on "media" ("type");`);
    this.addSql(`create index "idx_media_checksum" on "media" ("checksum");`);
    this.addSql(
      `create index "idx_media_deleted_at" on "media" ("deleted_at");`,
    );

    this.addSql(
      `create table "media_relations" ("id" bigserial primary key, "media_id" bigint not null, "entity_type" "entity_type" not null, "entity_id" bigint not null, "role" varchar(50) not null default 'gallery', "position" int not null default 0, "metadata" jsonb null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_media_relations_media_id" on "media_relations" ("media_id");`,
    );
    this.addSql(
      `CREATE INDEX idx_media_relations_entity ON public.media_relations USING btree (entity_type, entity_id);`,
    );

    this.addSql(
      `create table "media_sets" ("id" bigserial primary key, "name" varchar(255) not null, "description" text null, "created_at" timestamptz not null default now());`,
    );

    this.addSql(
      `create table "media_set_items" ("id" bigserial primary key, "media_set_id" bigint not null, "media_id" bigint not null, "position" int not null default 0);`,
    );
    this.addSql(
      `alter table "media_set_items" add constraint "media_set_items_media_set_id_media_id_key" unique ("media_id", "media_set_id");`,
    );

    this.addSql(
      `create table "media_tags" ("id" bigserial primary key, "media_id" bigint not null, "tag" varchar(100) not null, "value" varchar(255) not null);`,
    );
    this.addSql(
      `create index "idx_media_tags_media_id" on "media_tags" ("media_id");`,
    );
    this.addSql(
      `alter table "media_tags" add constraint "media_tags_media_id_tag_value_key" unique ("media_id", "tag", "value");`,
    );

    this.addSql(
      `create table "media_translations" ("id" bigserial primary key, "media_id" bigint not null, "lang_id" bigint not null, "alt_text" text null, "caption" text null);`,
    );
    this.addSql(
      `alter table "media_translations" add constraint "media_translations_media_id_lang_key" unique ("lang_id", "media_id");`,
    );

    this.addSql(
      `create table "permissions" ("id" bigserial primary key, "name" varchar(100) not null, "description" text null);`,
    );
    this.addSql(
      `alter table "permissions" add constraint "permissions_name_key" unique ("name");`,
    );

    this.addSql(
      `create table "policies" ("id" bigserial primary key, "name" varchar(150) not null, "type" varchar(50) not null, "effect" "policy_effect" not null default 'allow', "priority" int not null default 0, "is_active" boolean not null default true, "condition_json" jsonb not null, "payload_json" jsonb null, "valid_from" timestamptz null, "valid_to" timestamptz null, "campaign_id" bigint null, "applies_to_subject" jsonb null, "applies_to_resource" jsonb null, "applies_to_context" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(`create index "idx_policies_type" on "policies" ("type");`);
    this.addSql(
      `create index "idx_policies_active_time" on "policies" ("is_active", "valid_from", "valid_to");`,
    );
    this.addSql(
      `create index "idx_policies_condition_json_gin" on "policies" ("condition_json");`,
    );
    this.addSql(
      `create index "idx_policies_payload_json_gin" on "policies" ("payload_json");`,
    );

    this.addSql(
      `create table "policy_bindings" ("id" bigserial primary key, "policy_id" bigint not null, "resource_id" bigint not null, "action_id" bigint not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_policy_bindings_policy" on "policy_bindings" ("policy_id");`,
    );
    this.addSql(
      `create index "idx_policy_bindings_resource" on "policy_bindings" ("resource_id");`,
    );
    this.addSql(
      `create index "idx_policy_bindings_action" on "policy_bindings" ("action_id");`,
    );
    this.addSql(
      `alter table "policy_bindings" add constraint "policy_bindings_policy_id_resource_id_action_id_key" unique ("action_id", "policy_id", "resource_id");`,
    );

    this.addSql(
      `create table "product_bundles" ("id" bigserial primary key, "is_dynamic" boolean not null default false, "created_at" timestamptz not null default now());`,
    );

    this.addSql(
      `create table "products" ("id" bigserial primary key, "name" varchar(255) not null, "slug" varchar(255) not null default gen_random_uuid(), "description" text null, "category_id" bigint null, "type" "product_type" not null default 'simple', "availability_status" "product_availability_status" not null default 'available', "available_from" timestamptz null, "base_currency" "currency" not null default 'IRR', "base_price" numeric(10,0) not null, "tax_class_id" bigint null, "publish_status" "product_publish_status" not null default 'draft', "publish_at" timestamptz null, "deleted_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "products" add constraint "products_slug_key" unique ("slug");`,
    );
    this.addSql(`create index "idx_products_type" on "products" ("type");`);
    this.addSql(
      `create index "idx_products_availability_status" on "products" ("availability_status");`,
    );
    this.addSql(
      `create index "idx_products_publish_status" on "products" ("publish_status");`,
    );
    this.addSql(
      `create index "idx_products_deleted_at" on "products" ("deleted_at");`,
    );

    this.addSql(
      `create table "product_translations" ("id" bigserial primary key, "product_id" bigint not null, "lang_id" bigint not null, "name" varchar(255) not null, "description" text null, "short_description" text null, "meta_title" varchar(255) null, "meta_description" text null, "meta_keywords" text null);`,
    );
    this.addSql(
      `alter table "product_translations" add constraint "product_translations_product_id_lang_key" unique ("lang_id", "product_id");`,
    );

    this.addSql(
      `create table "product_variants" ("id" bigserial primary key, "product_id" bigint not null, "sku" varchar(100) null, "name" varchar(255) null, "base_price" numeric(10,0) not null, "availability_status" "product_availability_status" not null default 'available', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null);`,
    );
    this.addSql(
      `create index "idx_product_variants_product_id" on "product_variants" ("product_id");`,
    );
    this.addSql(
      `alter table "product_variants" add constraint "product_variants_sku_key" unique ("sku");`,
    );

    this.addSql(
      `create table "product_relations" ("id" bigserial primary key, "product_id" bigint not null, "related_product_id" bigint not null, "related_variant_id" bigint null, "relation_type" "product_relation_type" not null, "position" int not null default 0);`,
    );
    this.addSql(
      `create index "idx_product_relations_product" on "product_relations" ("product_id");`,
    );
    this.addSql(
      `alter table "product_relations" add constraint "product_relations_product_id_related_product_id_relation_ty_key" unique ("product_id", "related_product_id", "relation_type");`,
    );

    this.addSql(
      `create table "product_prices" ("id" bigserial primary key, "product_id" bigint not null, "variant_id" bigint null, "currency" "currency" null default 'IRR', "amount" numeric(10,0) not null);`,
    );
    this.addSql(
      `create index "idx_product_prices_variation_currency" on "product_prices" ("product_id", "currency");`,
    );
    this.addSql(
      `alter table "product_prices" add constraint "product_prices_variation_id_currency_key" unique ("currency", "product_id", "variant_id");`,
    );

    this.addSql(
      `create table "product_price_history" ("id" bigserial primary key, "product_id" bigint not null, "variant_id" bigint null, "currency" "currency" not null, "amount" numeric(10,0) not null, "valid_from" timestamptz not null default now(), "valid_to" timestamptz null);`,
    );
    this.addSql(
      `create index "idx_pph_valid_from_to" on "product_price_history" ("valid_from", "valid_to");`,
    );
    this.addSql(
      `create index "idx_pph_variation_currency" on "product_price_history" ("product_id", "currency");`,
    );

    this.addSql(
      `create table "product_bundle_items" ("id" bigserial primary key, "bundle_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, "quantity" int not null default 1);`,
    );
    this.addSql(
      `create index "idx_product_bundle_items_bundle_id" on "product_bundle_items" ("bundle_id");`,
    );

    this.addSql(
      `create table "product_attribute_values" ("id" bigserial primary key, "product_id" bigint null, "variation_id" bigint null, "attribute_id" bigint not null, "attribute_value_id" bigint not null);`,
    );
    this.addSql(
      `create index "idx_pav_product_id" on "product_attribute_values" ("product_id");`,
    );
    this.addSql(
      `create index "idx_pav_variation_id" on "product_attribute_values" ("variation_id");`,
    );
    this.addSql(
      `create index "idx_pav_attribute_id" on "product_attribute_values" ("attribute_id");`,
    );

    this.addSql(
      `create table "collection_products" ("collection_id" bigint not null, "product_id" bigint not null, "product_variant_id" bigint null, "position" int not null default 0, primary key ("collection_id", "product_id"));`,
    );

    this.addSql(
      `create table "campaign_products" ("campaign_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, primary key ("campaign_id", "product_id"));`,
    );

    this.addSql(
      `create table "promotion_campaigns" ("id" bigserial primary key, "name" varchar(255) not null, "code" varchar(100) not null, "description" text null, "starts_at" timestamptz null, "ends_at" timestamptz null, "is_active" boolean not null default true, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "promotion_campaigns" add constraint "promotion_campaigns_code_key" unique ("code");`,
    );

    this.addSql(
      `create table "promotions" ("id" bigserial primary key, "code" varchar(100) null, "name" varchar(255) not null, "description" text null, "type" varchar(50) not null, "discount_type" varchar(20) null, "discount_value" numeric(10,0) null, "max_discount_value" numeric(10,0) null, "usage_limit" int null, "usage_limit_per_user" int null, "starts_at" timestamptz null, "ends_at" timestamptz null, "is_active" boolean not null default true, "is_stackable" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "promotions" add constraint "promotions_code_key" unique ("code");`,
    );
    this.addSql(
      `create index "idx_promotions_active_time" on "promotions" ("is_active", "starts_at", "ends_at");`,
    );

    this.addSql(
      `create table "promotion_conditions" ("id" bigserial primary key, "promotion_id" bigint not null, "condition_json" jsonb not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_promotion_conditions_promotion" on "promotion_conditions" ("promotion_id");`,
    );

    this.addSql(
      `create table "promotion_actions" ("id" bigserial primary key, "promotion_id" bigint not null, "action_type" varchar(50) not null, "action_json" jsonb not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_promotion_actions_promotion" on "promotion_actions" ("promotion_id");`,
    );

    this.addSql(
      `create table "promotion_campaign_links" ("campaign_id" bigint not null, "promotion_id" bigint not null, primary key ("campaign_id", "promotion_id"));`,
    );

    this.addSql(
      `create table "promotion_targets" ("id" bigserial primary key, "promotion_id" bigint not null, "target_type" varchar(50) not null, "target_id" bigint null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_promotion_targets_promotion" on "promotion_targets" ("promotion_id");`,
    );

    this.addSql(`create table "roles" ("id" bigserial primary key);`);

    this.addSql(
      `create table "role_permissions" ("role_id" bigint not null, "permission_id" bigint not null, primary key ("role_id", "permission_id"));`,
    );

    this.addSql(
      `create table "roles_translations" ("id" bigserial primary key, "role_id" bigint not null, "lang_id" bigint not null, "name" varchar(50) not null, "description" text null);`,
    );
    this.addSql(
      `alter table "roles_translations" add constraint "roles_translations_role_id_lang_key" unique ("lang_id", "role_id");`,
    );

    this.addSql(
      `create table "seo_metadata" ("id" bigserial primary key, "entity_type" "entity_type" not null, "entity_id" bigint not null, "lang_id" bigint not null, "meta_title" varchar(255) null, "meta_description" text null, "meta_keywords" text null, "og_title" varchar(255) null, "og_description" text null, "og_image_url" text null);`,
    );
    this.addSql(
      `CREATE INDEX idx_seo_metadata_entity ON public.seo_metadata USING btree (entity_type, entity_id);`,
    );
    this.addSql(
      `CREATE UNIQUE INDEX seo_metadata_entity_type_entity_id_lang_key ON public.seo_metadata USING btree (entity_id, entity_type, lang_id)`,
    );

    this.addSql(
      `create table "shipping_zones" ("id" bigserial primary key, "name" varchar(255) not null, "countries" text[] null, "created_at" timestamptz not null default now());`,
    );

    this.addSql(
      `create table "shipping_methods" ("id" bigserial primary key, "zone_id" bigint null, "name" varchar(255) not null, "code" varchar(100) not null, "is_active" boolean not null default true, "base_price" numeric(10,0) not null default '0', "price_per_kg" numeric(10,0) not null default '0', "min_order_total" numeric(10,0) null, "max_order_total" numeric(10,0) null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "shipping_methods" add constraint "shipping_methods_code_key" unique ("code");`,
    );

    this.addSql(
      `create table "product_shipping_rules" ("id" bigserial primary key, "product_id" bigint not null, "product_variant_id" bigint null, "shipping_method_id" bigint null, "is_excluded" boolean not null default false, "extra_fee" numeric(10,0) null);`,
    );

    this.addSql(
      `create table "suppliers" ("id" bigserial primary key, "name" varchar(255) not null, "contact_info" jsonb null, "created_at" timestamptz not null default now());`,
    );

    this.addSql(
      `create table "product_purchase_prices" ("id" bigserial primary key, "product_id" bigint not null, "variant_id" bigint null, "supplier_id" bigint null, "currency" varchar(3) not null, "amount" numeric(10,0) not null, "valid_from" timestamptz not null default now(), "valid_to" timestamptz null);`,
    );
    this.addSql(
      `create index "idx_ppp_valid_from_to" on "product_purchase_prices" ("valid_from", "valid_to");`,
    );
    this.addSql(
      `create index "idx_ppp_variant_currency" on "product_purchase_prices" ("variant_id", "currency");`,
    );

    this.addSql(
      `create table "users" ("id" bigserial primary key, "email" text not null, "birthday" date null, "phone_number" varchar(15) not null, "last_login" timestamptz null, "status" varchar(20) not null default 'active', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_key" unique ("email");`,
    );
    this.addSql(
      `alter table "users" add constraint "users_phone_number_key" unique ("phone_number");`,
    );
    this.addSql(`create index "idx_users_status" on "users" ("status");`);
    this.addSql(
      `create index "idx_users_created_at" on "users" ("created_at");`,
    );

    this.addSql(
      `create table "user_attributes" ("id" bigserial primary key, "user_id" bigint not null, "key" varchar(100) not null, "value_text" text null, "value_num" numeric(10,0) null, "value_bool" boolean null, "value_json" jsonb null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_user_attributes_key" on "user_attributes" ("key");`,
    );
    this.addSql(
      `CREATE INDEX idx_user_attributes_key_bool ON public.user_attributes USING btree (key, value_bool) WHERE (value_bool IS NOT NULL);`,
    );
    this.addSql(
      `CREATE INDEX idx_user_attributes_key_num ON public.user_attributes USING btree (key, value_num) WHERE (value_num IS NOT NULL);`,
    );
    this.addSql(
      `CREATE INDEX idx_user_attributes_key_text ON public.user_attributes USING btree (key, value_text) WHERE (value_text IS NOT NULL);`,
    );
    this.addSql(
      `alter table "user_attributes" add constraint "uq_user_attributes_user_key" unique ("user_id", "key");`,
    );

    this.addSql(
      `create table "user_addresses" ("id" bigserial primary key, "user_id" bigint not null, "type" "address_type" not null default 'both', "is_default" boolean not null default false, "full_name" varchar(200) null, "province" varchar(255) null, "township_id" bigint not null, "zone" varchar(200) null, "village" varchar(255) null, "locality_type" varchar(200) not null, "locality_name" varchar(255) not null, "sublocality" varchar(255) null, "street" varchar(255) not null, "street2" varchar(255) null, "house_no" numeric(10,0) not null, "floor" varchar(64) null default '', "side_floor" varchar(64) null default '', "building_name" text null, "description" text null, "post_code" varchar(20) not null, "country" varchar(5) not null default 'IR', "receiver_name" varchar(100) null, "receiver_phone" varchar(15) null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_user_addresses_user_id" on "user_addresses" ("user_id");`,
    );
    this.addSql(
      `create index "idx_user_addresses_type" on "user_addresses" ("type");`,
    );

    this.addSql(
      `create table "user_roles" ("user_id" bigint not null, "role_id" bigint not null, primary key ("user_id", "role_id"));`,
    );

    this.addSql(
      `create table "product_versions" ("id" bigserial primary key, "product_id" bigint not null, "version_number" int not null, "data_snapshot" jsonb not null, "created_by" bigint null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_product_versions_product_id" on "product_versions" ("product_id");`,
    );
    this.addSql(
      `alter table "product_versions" add constraint "product_versions_product_id_version_number_key" unique ("product_id", "version_number");`,
    );

    this.addSql(
      `create table "product_status_history" ("id" bigserial primary key, "product_id" bigint not null, "old_publish_status" "product_publish_status" null, "new_publish_status" "product_publish_status" null, "old_availability_status" "product_availability_status" null, "new_availability_status" "product_availability_status" null, "changed_by" bigint null, "changed_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_product_status_history_product" on "product_status_history" ("product_id");`,
    );

    this.addSql(
      `create table "orders" ("id" bigserial primary key, "user_id" bigint null, "status" varchar(20) not null, "currency" varchar(3) not null, "subtotal_amount" numeric(10,0) not null, "tax_amount" numeric(10,0) not null default '0', "shipping_amount" numeric(10,0) not null default '0', "discount_amount" numeric(10,0) not null default '0', "total_amount" numeric(10,0) not null, "billing_address_id" bigint null, "shipping_address_id" bigint null, "notes" varchar(2000) null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(`create index "idx_orders_user_id" on "orders" ("user_id");`);
    this.addSql(`create index "idx_orders_status" on "orders" ("status");`);
    this.addSql(
      `create index "idx_orders_created_at" on "orders" ("created_at");`,
    );

    this.addSql(
      `create table "shipments" ("id" bigserial primary key, "order_id" bigint not null, "carrier" varchar(100) null, "tracking_number" varchar(255) null, "status" varchar(20) not null, "shipped_at" timestamptz null, "delivered_at" timestamptz null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_shipments_order_id" on "shipments" ("order_id");`,
    );

    this.addSql(
      `create table "reviews" ("id" bigserial primary key, "user_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, "order_id" bigint null, "rating" int not null, "title" varchar(255) null, "body" text null, "is_approved" boolean not null default false, "created_at" timestamptz not null default now());`,
    );
    this.addSql(`create index "idx_reviews_user_id" on "reviews" ("user_id");`);
    this.addSql(
      `create index "idx_reviews_product_id" on "reviews" ("product_id");`,
    );

    this.addSql(
      `create table "review_votes" ("id" bigserial primary key, "review_id" bigint not null, "user_id" bigint not null, "is_helpful" boolean not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "review_votes" add constraint "review_votes_review_id_user_id_key" unique ("review_id", "user_id");`,
    );

    this.addSql(
      `create table "returns" ("id" bigserial primary key, "order_id" bigint not null, "status" varchar(20) not null, "reason" text null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_returns_order_id" on "returns" ("order_id");`,
    );

    this.addSql(
      `create table "promotion_usage" ("id" bigserial primary key, "promotion_id" bigint not null, "user_id" bigint null, "order_id" bigint null, "used_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_promotion_usage_promotion" on "promotion_usage" ("promotion_id");`,
    );
    this.addSql(
      `create index "idx_promotion_usage_user" on "promotion_usage" ("user_id");`,
    );

    this.addSql(
      `create table "payments" ("id" bigserial primary key, "order_id" bigint not null, "provider" varchar(50) not null, "amount" numeric(10,0) not null, "currency" varchar(3) not null, "status" varchar(20) not null, "external_reference" varchar(255) null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_payments_order_id" on "payments" ("order_id");`,
    );
    this.addSql(`create index "idx_payments_status" on "payments" ("status");`);

    this.addSql(
      `create table "order_items" ("id" bigserial primary key, "order_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, "quantity" int not null, "unit_price" numeric(10,0) not null, "purchase_price" numeric(10,0) null, "tax_amount" numeric(10,0) not null default '0', "discount_amount" numeric(10,0) not null default '0', "total_price" numeric(10,0) not null, "description" varchar(2000) null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_order_items_order_id" on "order_items" ("order_id");`,
    );

    this.addSql(
      `create table "shipment_items" ("id" bigserial primary key, "shipment_id" bigint not null, "order_item_id" bigint not null, "quantity" int not null);`,
    );
    this.addSql(
      `create index "idx_shipment_items_shipment_id" on "shipment_items" ("shipment_id");`,
    );

    this.addSql(
      `create table "return_items" ("id" bigserial primary key, "return_id" bigint not null, "order_item_id" bigint not null, "quantity" int not null, "condition" varchar(50) null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_return_items_return_id" on "return_items" ("return_id");`,
    );

    this.addSql(
      `create table "refunds" ("id" bigserial primary key, "payment_id" bigint not null, "order_item_id" bigint null, "amount" numeric(10,0) not null, "reason" text null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_refunds_payment_id" on "refunds" ("payment_id");`,
    );
    this.addSql(
      `create index "idx_refunds_order_item_id" on "refunds" ("order_item_id");`,
    );

    this.addSql(
      `create table "gift_card_transactions" ("id" bigserial primary key, "gift_card_id" bigint not null, "type" varchar(20) not null, "order_id" bigint null, "amount" numeric(10,0) not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_gct_gift_card_id" on "gift_card_transactions" ("gift_card_id");`,
    );

    this.addSql(
      `create table "media_versions" ("id" bigserial primary key, "media_id" bigint not null, "version_number" int not null, "data_snapshot" jsonb not null, "created_by" bigint null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "media_versions" add constraint "media_versions_media_id_version_number_key" unique ("media_id", "version_number");`,
    );

    this.addSql(
      `create table "favorites" ("user_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, "created_at" timestamptz not null default now(), primary key ("user_id", "product_id"));`,
    );

    this.addSql(
      `create table "carts" ("id" bigserial primary key, "user_id" bigint null, "session_id" varchar(255) null, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now());`,
    );
    this.addSql(`create index "idx_carts_user" on "carts" ("user_id");`);
    this.addSql(`create index "idx_carts_session" on "carts" ("session_id");`);

    this.addSql(
      `create table "cart_items" ("id" bigserial primary key, "cart_id" bigint not null, "product_id" bigint not null, "variant_id" bigint null, "quantity" int not null default 1, "unit_price" numeric(10,0) not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_cart_items_cart" on "cart_items" ("cart_id");`,
    );
    this.addSql(
      `create index "idx_cart_items_product" on "cart_items" ("product_id");`,
    );

    this.addSql(
      `create table "audit_logs" ("id" bigserial primary key, "actor_user_id" bigint null, "entity_type" varchar(50) not null, "entity_id" bigint null, "action" varchar(50) not null, "metadata" jsonb null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_audit_logs_actor" on "audit_logs" ("actor_user_id");`,
    );
    this.addSql(
      `create index "idx_audit_logs_entity" on "audit_logs" ("entity_type", "entity_id");`,
    );

    this.addSql(
      `create table "user_tiers" ("id" bigserial primary key, "code" varchar(50) not null, "priority" int not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `alter table "user_tiers" add constraint "user_tiers_code_key" unique ("code");`,
    );
    this.addSql(
      `create index "idx_user_tiers_priority" on "user_tiers" ("priority");`,
    );

    this.addSql(
      `create table "user_tier_assignments" ("user_id" bigint not null, "tier_id" bigint not null, "assigned_at" timestamptz not null default now(), "expires_at" timestamptz null, primary key ("user_id"));`,
    );
    this.addSql(
      `create index "idx_user_tier_assignments_tier_id" on "user_tier_assignments" ("tier_id");`,
    );
    this.addSql(
      `create index "idx_user_tier_assignments_expires_at" on "user_tier_assignments" ("expires_at");`,
    );

    this.addSql(
      `create table "wallets" ("id" bigserial primary key, "user_id" bigint not null, "currency" "currency" not null default 'IRR', "current_balance" numeric(10,0) not null default '0');`,
    );
    this.addSql(`create index "idx_wallets_user_id" on "wallets" ("user_id");`);
    this.addSql(
      `alter table "wallets" add constraint "wallets_user_id_currency_key" unique ("currency", "user_id");`,
    );

    this.addSql(
      `create table "wallet_ledger" ("id" bigserial primary key, "wallet_id" bigint not null, "type" "wallet_ledger_type" not null, "source_type" "wallet_ledger_source_type" not null, "source_id" bigint null, "amount" numeric(10,0) not null, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_wallet_ledger_wallet_id" on "wallet_ledger" ("wallet_id");`,
    );
    this.addSql(
      `create index "idx_wallet_ledger_source" on "wallet_ledger" ("source_type", "source_id");`,
    );

    this.addSql(
      `create table "warehouses" ("id" bigserial primary key, "name" varchar(255) not null, "location" jsonb null, "created_at" timestamptz not null default now());`,
    );

    this.addSql(
      `create table "product_inventory" ("id" bigserial primary key, "product_id" bigint not null, "variation_id" bigint null, "warehouse_id" bigint null, "stock_quantity" int not null default 0, "stock_reserved" int not null default 0, "stock_threshold" int not null default 0, "updated_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_product_inventory_product_id" on "product_inventory" ("product_id");`,
    );
    this.addSql(
      `create index "idx_product_inventory_warehouse_id" on "product_inventory" ("warehouse_id");`,
    );
    this.addSql(
      `alter table "product_inventory" add constraint "product_inventory_product_id_warehouse_id_key" unique ("product_id", "warehouse_id");`,
    );

    this.addSql(
      `create table "wishlists" ("id" bigserial primary key, "user_id" bigint not null, "name" varchar(255) not null default 'Default', "is_default" boolean not null default false, "created_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_wishlists_user_id" on "wishlists" ("user_id");`,
    );

    this.addSql(
      `create table "wishlist_items" ("id" bigserial primary key, "wishlist_id" bigint not null, "product_id" bigint not null, "variation_id" bigint null, "added_at" timestamptz not null default now());`,
    );
    this.addSql(
      `create index "idx_wishlist_items_wishlist_id" on "wishlist_items" ("wishlist_id");`,
    );
    this.addSql(
      `alter table "wishlist_items" add constraint "wishlist_items_wishlist_id_product_id_variant_id_key" unique ("product_id", "variation_id", "wishlist_id");`,
    );

    this.addSql(
      `alter table "attribute_values" add constraint "attribute_values_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "categories" add constraint "categories_parent_id_foreign" foreign key ("parent_id") references "categories" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "collection_translations" add constraint "collection_translations_collection_id_foreign" foreign key ("collection_id") references "collections" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "collection_translations" add constraint "collection_translations_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "category_translations" add constraint "category_translations_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "category_translations" add constraint "category_translations_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "locations" add constraint "locations_province_id_foreign" foreign key ("province_id") references "locations" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "media_relations" add constraint "media_relations_media_id_foreign" foreign key ("media_id") references "media" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "media_set_items" add constraint "media_set_items_media_set_id_foreign" foreign key ("media_set_id") references "media_sets" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "media_set_items" add constraint "media_set_items_media_id_foreign" foreign key ("media_id") references "media" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "media_tags" add constraint "media_tags_media_id_foreign" foreign key ("media_id") references "media" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "media_translations" add constraint "media_translations_media_id_foreign" foreign key ("media_id") references "media" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "media_translations" add constraint "media_translations_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "policies" add constraint "policies_campaign_id_foreign" foreign key ("campaign_id") references "campaigns" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "policy_bindings" add constraint "policy_bindings_policy_id_foreign" foreign key ("policy_id") references "policies" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "policy_bindings" add constraint "policy_bindings_resource_id_foreign" foreign key ("resource_id") references "abac_resources" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "policy_bindings" add constraint "policy_bindings_action_id_foreign" foreign key ("action_id") references "abac_actions" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "product_translations" add constraint "product_translations_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_translations" add constraint "product_translations_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_variants" add constraint "product_variants_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_relations" add constraint "product_relations_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_relations" add constraint "product_relations_related_product_id_foreign" foreign key ("related_product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_relations" add constraint "product_relations_related_variant_id_foreign" foreign key ("related_variant_id") references "product_variants" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "product_prices" add constraint "product_prices_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_prices" add constraint "product_prices_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_price_history" add constraint "product_price_history_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_price_history" add constraint "product_price_history_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_bundle_items" add constraint "product_bundle_items_bundle_id_foreign" foreign key ("bundle_id") references "product_bundles" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_bundle_items" add constraint "product_bundle_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_bundle_items" add constraint "product_bundle_items_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_attribute_values" add constraint "product_attribute_values_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_attribute_values" add constraint "product_attribute_values_variation_id_foreign" foreign key ("variation_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_attribute_values" add constraint "product_attribute_values_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_attribute_values" add constraint "product_attribute_values_attribute_value_id_foreign" foreign key ("attribute_value_id") references "attribute_values" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "collection_products" add constraint "collection_products_collection_id_foreign" foreign key ("collection_id") references "collections" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "collection_products" add constraint "collection_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "collection_products" add constraint "collection_products_product_variant_id_foreign" foreign key ("product_variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "campaign_products" add constraint "campaign_products_campaign_id_foreign" foreign key ("campaign_id") references "campaigns" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "campaign_products" add constraint "campaign_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "campaign_products" add constraint "campaign_products_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "promotion_conditions" add constraint "promotion_conditions_promotion_id_foreign" foreign key ("promotion_id") references "promotions" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "promotion_actions" add constraint "promotion_actions_promotion_id_foreign" foreign key ("promotion_id") references "promotions" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "promotion_campaign_links" add constraint "promotion_campaign_links_campaign_id_foreign" foreign key ("campaign_id") references "promotion_campaigns" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "promotion_campaign_links" add constraint "promotion_campaign_links_promotion_id_foreign" foreign key ("promotion_id") references "promotions" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "promotion_targets" add constraint "promotion_targets_promotion_id_foreign" foreign key ("promotion_id") references "promotions" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "roles_translations" add constraint "roles_translations_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "roles_translations" add constraint "roles_translations_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "seo_metadata" add constraint "seo_metadata_lang_id_foreign" foreign key ("lang_id") references "languages" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "shipping_methods" add constraint "shipping_methods_zone_id_foreign" foreign key ("zone_id") references "shipping_zones" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "product_shipping_rules" add constraint "product_shipping_rules_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_shipping_rules" add constraint "product_shipping_rules_product_variant_id_foreign" foreign key ("product_variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_shipping_rules" add constraint "product_shipping_rules_shipping_method_id_foreign" foreign key ("shipping_method_id") references "shipping_methods" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "product_purchase_prices" add constraint "product_purchase_prices_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_purchase_prices" add constraint "product_purchase_prices_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_purchase_prices" add constraint "product_purchase_prices_supplier_id_foreign" foreign key ("supplier_id") references "suppliers" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "user_attributes" add constraint "user_attributes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "user_addresses" add constraint "user_addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "user_addresses" add constraint "user_addresses_township_id_foreign" foreign key ("township_id") references "locations" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "user_roles" add constraint "user_roles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_roles" add constraint "user_roles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "product_versions" add constraint "product_versions_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_versions" add constraint "product_versions_created_by_foreign" foreign key ("created_by") references "users" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "product_status_history" add constraint "product_status_history_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_status_history" add constraint "product_status_history_changed_by_foreign" foreign key ("changed_by") references "users" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete set null;`,
    );
    this.addSql(
      `alter table "orders" add constraint "orders_billing_address_id_foreign" foreign key ("billing_address_id") references "user_addresses" ("id") on update no action on delete set null;`,
    );
    this.addSql(
      `alter table "orders" add constraint "orders_shipping_address_id_foreign" foreign key ("shipping_address_id") references "user_addresses" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "shipments" add constraint "shipments_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "reviews" add constraint "reviews_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "reviews" add constraint "reviews_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "reviews" add constraint "reviews_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete set null;`,
    );
    this.addSql(
      `alter table "reviews" add constraint "reviews_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "review_votes" add constraint "review_votes_review_id_foreign" foreign key ("review_id") references "reviews" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "review_votes" add constraint "review_votes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "returns" add constraint "returns_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "promotion_usage" add constraint "promotion_usage_promotion_id_foreign" foreign key ("promotion_id") references "promotions" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "promotion_usage" add constraint "promotion_usage_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete set null;`,
    );
    this.addSql(
      `alter table "promotion_usage" add constraint "promotion_usage_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "payments" add constraint "payments_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete set null;`,
    );
    this.addSql(
      `alter table "order_items" add constraint "order_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete no action;`,
    );
    this.addSql(
      `alter table "order_items" add constraint "order_items_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete no action;`,
    );

    this.addSql(
      `alter table "shipment_items" add constraint "shipment_items_shipment_id_foreign" foreign key ("shipment_id") references "shipments" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "shipment_items" add constraint "shipment_items_order_item_id_foreign" foreign key ("order_item_id") references "order_items" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "return_items" add constraint "return_items_return_id_foreign" foreign key ("return_id") references "returns" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "return_items" add constraint "return_items_order_item_id_foreign" foreign key ("order_item_id") references "order_items" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "refunds" add constraint "refunds_payment_id_foreign" foreign key ("payment_id") references "payments" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "refunds" add constraint "refunds_order_item_id_foreign" foreign key ("order_item_id") references "order_items" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "gift_card_transactions" add constraint "gift_card_transactions_gift_card_id_foreign" foreign key ("gift_card_id") references "gift_cards" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "gift_card_transactions" add constraint "gift_card_transactions_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "media_versions" add constraint "media_versions_media_id_foreign" foreign key ("media_id") references "media" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "media_versions" add constraint "media_versions_created_by_foreign" foreign key ("created_by") references "users" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "favorites" add constraint "favorites_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "favorites" add constraint "favorites_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "favorites" add constraint "favorites_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "carts" add constraint "carts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "cart_items" add constraint "cart_items_cart_id_foreign" foreign key ("cart_id") references "carts" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete restrict;`,
    );
    this.addSql(
      `alter table "cart_items" add constraint "cart_items_variant_id_foreign" foreign key ("variant_id") references "product_variants" ("id") on update no action on delete restrict;`,
    );

    this.addSql(
      `alter table "audit_logs" add constraint "audit_logs_actor_user_id_foreign" foreign key ("actor_user_id") references "users" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "user_tier_assignments" add constraint "user_tier_assignments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "user_tier_assignments" add constraint "user_tier_assignments_tier_id_foreign" foreign key ("tier_id") references "user_tiers" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "wallets" add constraint "wallets_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "wallet_ledger" add constraint "wallet_ledger_wallet_id_foreign" foreign key ("wallet_id") references "wallets" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "product_inventory" add constraint "product_inventory_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_inventory" add constraint "product_inventory_variation_id_foreign" foreign key ("variation_id") references "product_variants" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "product_inventory" add constraint "product_inventory_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update no action on delete set null;`,
    );

    this.addSql(
      `alter table "wishlists" add constraint "wishlists_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action on delete cascade;`,
    );

    this.addSql(
      `alter table "wishlist_items" add constraint "wishlist_items_wishlist_id_foreign" foreign key ("wishlist_id") references "wishlists" ("id") on update no action on delete cascade;`,
    );
    this.addSql(
      `alter table "wishlist_items" add constraint "wishlist_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action on delete no action;`,
    );
    this.addSql(
      `alter table "wishlist_items" add constraint "wishlist_items_variation_id_foreign" foreign key ("variation_id") references "product_variants" ("id") on update no action on delete no action;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(
      `alter table "policy_bindings" drop constraint "policy_bindings_action_id_foreign";`,
    );
    this.addSql(
      `alter table "policy_bindings" drop constraint "policy_bindings_resource_id_foreign";`,
    );
    this.addSql(
      `alter table "attribute_values" drop constraint "attribute_values_attribute_id_foreign";`,
    );
    this.addSql(
      `alter table "product_attribute_values" drop constraint "product_attribute_values_attribute_id_foreign";`,
    );
    this.addSql(
      `alter table "product_attribute_values" drop constraint "product_attribute_values_attribute_value_id_foreign";`,
    );
    this.addSql(
      `alter table "policies" drop constraint "policies_campaign_id_foreign";`,
    );
    this.addSql(
      `alter table "campaign_products" drop constraint "campaign_products_campaign_id_foreign";`,
    );
    this.addSql(
      `alter table "categories" drop constraint "categories_parent_id_foreign";`,
    );
    this.addSql(
      `alter table "category_translations" drop constraint "category_translations_category_id_foreign";`,
    );
    this.addSql(
      `alter table "products" drop constraint "products_category_id_foreign";`,
    );
    this.addSql(
      `alter table "collection_translations" drop constraint "collection_translations_collection_id_foreign";`,
    );
    this.addSql(
      `alter table "collection_products" drop constraint "collection_products_collection_id_foreign";`,
    );
    this.addSql(
      `alter table "gift_card_transactions" drop constraint "gift_card_transactions_gift_card_id_foreign";`,
    );
    this.addSql(
      `alter table "collection_translations" drop constraint "collection_translations_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "category_translations" drop constraint "category_translations_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "media_translations" drop constraint "media_translations_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "product_translations" drop constraint "product_translations_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "roles_translations" drop constraint "roles_translations_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "seo_metadata" drop constraint "seo_metadata_lang_id_foreign";`,
    );
    this.addSql(
      `alter table "locations" drop constraint "locations_province_id_foreign";`,
    );
    this.addSql(
      `alter table "user_addresses" drop constraint "user_addresses_township_id_foreign";`,
    );
    this.addSql(
      `alter table "media_relations" drop constraint "media_relations_media_id_foreign";`,
    );
    this.addSql(
      `alter table "media_set_items" drop constraint "media_set_items_media_id_foreign";`,
    );
    this.addSql(
      `alter table "media_tags" drop constraint "media_tags_media_id_foreign";`,
    );
    this.addSql(
      `alter table "media_translations" drop constraint "media_translations_media_id_foreign";`,
    );
    this.addSql(
      `alter table "media_versions" drop constraint "media_versions_media_id_foreign";`,
    );
    this.addSql(
      `alter table "media_set_items" drop constraint "media_set_items_media_set_id_foreign";`,
    );
    this.addSql(
      `alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";`,
    );
    this.addSql(
      `alter table "policy_bindings" drop constraint "policy_bindings_policy_id_foreign";`,
    );
    this.addSql(
      `alter table "product_bundle_items" drop constraint "product_bundle_items_bundle_id_foreign";`,
    );
    this.addSql(
      `alter table "product_translations" drop constraint "product_translations_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_variants" drop constraint "product_variants_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_relations" drop constraint "product_relations_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_relations" drop constraint "product_relations_related_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_prices" drop constraint "product_prices_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_price_history" drop constraint "product_price_history_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_bundle_items" drop constraint "product_bundle_items_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_attribute_values" drop constraint "product_attribute_values_product_id_foreign";`,
    );
    this.addSql(
      `alter table "collection_products" drop constraint "collection_products_product_id_foreign";`,
    );
    this.addSql(
      `alter table "campaign_products" drop constraint "campaign_products_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_shipping_rules" drop constraint "product_shipping_rules_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_purchase_prices" drop constraint "product_purchase_prices_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_versions" drop constraint "product_versions_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_status_history" drop constraint "product_status_history_product_id_foreign";`,
    );
    this.addSql(
      `alter table "reviews" drop constraint "reviews_product_id_foreign";`,
    );
    this.addSql(
      `alter table "order_items" drop constraint "order_items_product_id_foreign";`,
    );
    this.addSql(
      `alter table "favorites" drop constraint "favorites_product_id_foreign";`,
    );
    this.addSql(
      `alter table "cart_items" drop constraint "cart_items_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_inventory" drop constraint "product_inventory_product_id_foreign";`,
    );
    this.addSql(
      `alter table "wishlist_items" drop constraint "wishlist_items_product_id_foreign";`,
    );
    this.addSql(
      `alter table "product_relations" drop constraint "product_relations_related_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_prices" drop constraint "product_prices_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_price_history" drop constraint "product_price_history_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_bundle_items" drop constraint "product_bundle_items_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_attribute_values" drop constraint "product_attribute_values_variation_id_foreign";`,
    );
    this.addSql(
      `alter table "collection_products" drop constraint "collection_products_product_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "campaign_products" drop constraint "campaign_products_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_shipping_rules" drop constraint "product_shipping_rules_product_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_purchase_prices" drop constraint "product_purchase_prices_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "reviews" drop constraint "reviews_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "order_items" drop constraint "order_items_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "favorites" drop constraint "favorites_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "cart_items" drop constraint "cart_items_variant_id_foreign";`,
    );
    this.addSql(
      `alter table "product_inventory" drop constraint "product_inventory_variation_id_foreign";`,
    );
    this.addSql(
      `alter table "wishlist_items" drop constraint "wishlist_items_variation_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_campaign_links" drop constraint "promotion_campaign_links_campaign_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_conditions" drop constraint "promotion_conditions_promotion_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_actions" drop constraint "promotion_actions_promotion_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_campaign_links" drop constraint "promotion_campaign_links_promotion_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_targets" drop constraint "promotion_targets_promotion_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_usage" drop constraint "promotion_usage_promotion_id_foreign";`,
    );
    this.addSql(
      `alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";`,
    );
    this.addSql(
      `alter table "roles_translations" drop constraint "roles_translations_role_id_foreign";`,
    );
    this.addSql(
      `alter table "user_roles" drop constraint "user_roles_role_id_foreign";`,
    );
    this.addSql(
      `alter table "shipping_methods" drop constraint "shipping_methods_zone_id_foreign";`,
    );
    this.addSql(
      `alter table "product_shipping_rules" drop constraint "product_shipping_rules_shipping_method_id_foreign";`,
    );
    this.addSql(
      `alter table "product_purchase_prices" drop constraint "product_purchase_prices_supplier_id_foreign";`,
    );
    this.addSql(
      `alter table "user_attributes" drop constraint "user_attributes_user_id_foreign";`,
    );
    this.addSql(
      `alter table "user_addresses" drop constraint "user_addresses_user_id_foreign";`,
    );
    this.addSql(
      `alter table "user_roles" drop constraint "user_roles_user_id_foreign";`,
    );
    this.addSql(
      `alter table "product_versions" drop constraint "product_versions_created_by_foreign";`,
    );
    this.addSql(
      `alter table "product_status_history" drop constraint "product_status_history_changed_by_foreign";`,
    );
    this.addSql(
      `alter table "orders" drop constraint "orders_user_id_foreign";`,
    );
    this.addSql(
      `alter table "reviews" drop constraint "reviews_user_id_foreign";`,
    );
    this.addSql(
      `alter table "review_votes" drop constraint "review_votes_user_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_usage" drop constraint "promotion_usage_user_id_foreign";`,
    );
    this.addSql(
      `alter table "media_versions" drop constraint "media_versions_created_by_foreign";`,
    );
    this.addSql(
      `alter table "favorites" drop constraint "favorites_user_id_foreign";`,
    );
    this.addSql(`alter table "carts" drop constraint "carts_user_id_foreign";`);
    this.addSql(
      `alter table "audit_logs" drop constraint "audit_logs_actor_user_id_foreign";`,
    );
    this.addSql(
      `alter table "user_tier_assignments" drop constraint "user_tier_assignments_user_id_foreign";`,
    );
    this.addSql(
      `alter table "wallets" drop constraint "wallets_user_id_foreign";`,
    );
    this.addSql(
      `alter table "wishlists" drop constraint "wishlists_user_id_foreign";`,
    );
    this.addSql(
      `alter table "orders" drop constraint "orders_billing_address_id_foreign";`,
    );
    this.addSql(
      `alter table "orders" drop constraint "orders_shipping_address_id_foreign";`,
    );
    this.addSql(
      `alter table "shipments" drop constraint "shipments_order_id_foreign";`,
    );
    this.addSql(
      `alter table "reviews" drop constraint "reviews_order_id_foreign";`,
    );
    this.addSql(
      `alter table "returns" drop constraint "returns_order_id_foreign";`,
    );
    this.addSql(
      `alter table "promotion_usage" drop constraint "promotion_usage_order_id_foreign";`,
    );
    this.addSql(
      `alter table "payments" drop constraint "payments_order_id_foreign";`,
    );
    this.addSql(
      `alter table "order_items" drop constraint "order_items_order_id_foreign";`,
    );
    this.addSql(
      `alter table "gift_card_transactions" drop constraint "gift_card_transactions_order_id_foreign";`,
    );
    this.addSql(
      `alter table "shipment_items" drop constraint "shipment_items_shipment_id_foreign";`,
    );
    this.addSql(
      `alter table "review_votes" drop constraint "review_votes_review_id_foreign";`,
    );
    this.addSql(
      `alter table "return_items" drop constraint "return_items_return_id_foreign";`,
    );
    this.addSql(
      `alter table "refunds" drop constraint "refunds_payment_id_foreign";`,
    );
    this.addSql(
      `alter table "shipment_items" drop constraint "shipment_items_order_item_id_foreign";`,
    );
    this.addSql(
      `alter table "return_items" drop constraint "return_items_order_item_id_foreign";`,
    );
    this.addSql(
      `alter table "refunds" drop constraint "refunds_order_item_id_foreign";`,
    );
    this.addSql(
      `alter table "cart_items" drop constraint "cart_items_cart_id_foreign";`,
    );
    this.addSql(
      `alter table "user_tier_assignments" drop constraint "user_tier_assignments_tier_id_foreign";`,
    );
    this.addSql(
      `alter table "wallet_ledger" drop constraint "wallet_ledger_wallet_id_foreign";`,
    );
    this.addSql(
      `alter table "product_inventory" drop constraint "product_inventory_warehouse_id_foreign";`,
    );
    this.addSql(
      `alter table "wishlist_items" drop constraint "wishlist_items_wishlist_id_foreign";`,
    );

    this.addSql(`drop table if exists "abac_actions" cascade;`);
    this.addSql(`drop table if exists "abac_resources" cascade;`);
    this.addSql(`drop table if exists "attributes" cascade;`);
    this.addSql(`drop table if exists "attribute_values" cascade;`);
    this.addSql(`drop table if exists "campaigns" cascade;`);
    this.addSql(`drop table if exists "categories" cascade;`);
    this.addSql(`drop table if exists "collections" cascade;`);
    this.addSql(`drop table if exists "gift_cards" cascade;`);
    this.addSql(`drop table if exists "languages" cascade;`);
    this.addSql(`drop table if exists "collection_translations" cascade;`);
    this.addSql(`drop table if exists "category_translations" cascade;`);
    this.addSql(`drop table if exists "locations" cascade;`);
    this.addSql(`drop table if exists "media" cascade;`);
    this.addSql(`drop table if exists "media_relations" cascade;`);
    this.addSql(`drop table if exists "media_sets" cascade;`);
    this.addSql(`drop table if exists "media_set_items" cascade;`);
    this.addSql(`drop table if exists "media_tags" cascade;`);
    this.addSql(`drop table if exists "media_translations" cascade;`);
    this.addSql(`drop table if exists "permissions" cascade;`);
    this.addSql(`drop table if exists "policies" cascade;`);
    this.addSql(`drop table if exists "policy_bindings" cascade;`);
    this.addSql(`drop table if exists "product_bundles" cascade;`);
    this.addSql(`drop table if exists "products" cascade;`);
    this.addSql(`drop table if exists "product_translations" cascade;`);
    this.addSql(`drop table if exists "product_variants" cascade;`);
    this.addSql(`drop table if exists "product_relations" cascade;`);
    this.addSql(`drop table if exists "product_prices" cascade;`);
    this.addSql(`drop table if exists "product_price_history" cascade;`);
    this.addSql(`drop table if exists "product_bundle_items" cascade;`);
    this.addSql(`drop table if exists "product_attribute_values" cascade;`);
    this.addSql(`drop table if exists "collection_products" cascade;`);
    this.addSql(`drop table if exists "campaign_products" cascade;`);
    this.addSql(`drop table if exists "promotion_campaigns" cascade;`);
    this.addSql(`drop table if exists "promotions" cascade;`);
    this.addSql(`drop table if exists "promotion_conditions" cascade;`);
    this.addSql(`drop table if exists "promotion_actions" cascade;`);
    this.addSql(`drop table if exists "promotion_campaign_links" cascade;`);
    this.addSql(`drop table if exists "promotion_targets" cascade;`);
    this.addSql(`drop table if exists "roles" cascade;`);
    this.addSql(`drop table if exists "role_permissions" cascade;`);
    this.addSql(`drop table if exists "roles_translations" cascade;`);
    this.addSql(`drop table if exists "seo_metadata" cascade;`);
    this.addSql(`drop table if exists "shipping_zones" cascade;`);
    this.addSql(`drop table if exists "shipping_methods" cascade;`);
    this.addSql(`drop table if exists "product_shipping_rules" cascade;`);
    this.addSql(`drop table if exists "suppliers" cascade;`);
    this.addSql(`drop table if exists "product_purchase_prices" cascade;`);
    this.addSql(`drop table if exists "users" cascade;`);
    this.addSql(`drop table if exists "user_attributes" cascade;`);
    this.addSql(`drop table if exists "user_addresses" cascade;`);
    this.addSql(`drop table if exists "user_roles" cascade;`);
    this.addSql(`drop table if exists "product_versions" cascade;`);
    this.addSql(`drop table if exists "product_status_history" cascade;`);
    this.addSql(`drop table if exists "orders" cascade;`);
    this.addSql(`drop table if exists "shipments" cascade;`);
    this.addSql(`drop table if exists "reviews" cascade;`);
    this.addSql(`drop table if exists "review_votes" cascade;`);
    this.addSql(`drop table if exists "returns" cascade;`);
    this.addSql(`drop table if exists "promotion_usage" cascade;`);
    this.addSql(`drop table if exists "payments" cascade;`);
    this.addSql(`drop table if exists "order_items" cascade;`);
    this.addSql(`drop table if exists "shipment_items" cascade;`);
    this.addSql(`drop table if exists "return_items" cascade;`);
    this.addSql(`drop table if exists "refunds" cascade;`);
    this.addSql(`drop table if exists "gift_card_transactions" cascade;`);
    this.addSql(`drop table if exists "media_versions" cascade;`);
    this.addSql(`drop table if exists "favorites" cascade;`);
    this.addSql(`drop table if exists "carts" cascade;`);
    this.addSql(`drop table if exists "cart_items" cascade;`);
    this.addSql(`drop table if exists "audit_logs" cascade;`);
    this.addSql(`drop table if exists "user_tiers" cascade;`);
    this.addSql(`drop table if exists "user_tier_assignments" cascade;`);
    this.addSql(`drop table if exists "wallets" cascade;`);
    this.addSql(`drop table if exists "wallet_ledger" cascade;`);
    this.addSql(`drop table if exists "warehouses" cascade;`);
    this.addSql(`drop table if exists "product_inventory" cascade;`);
    this.addSql(`drop table if exists "wishlists" cascade;`);
    this.addSql(`drop table if exists "wishlist_items" cascade;`);

    this.addSql(`drop type "attribute_type";`);
    this.addSql(`drop type "media_type";`);
    this.addSql(`drop type "entity_type";`);
    this.addSql(`drop type "policy_effect";`);
    this.addSql(`drop type "product_type";`);
    this.addSql(`drop type "product_availability_status";`);
    this.addSql(`drop type "currency";`);
    this.addSql(`drop type "product_publish_status";`);
    this.addSql(`drop type "product_relation_type";`);
    this.addSql(`drop type "address_type";`);
    this.addSql(`drop type "wallet_ledger_type";`);
    this.addSql(`drop type "wallet_ledger_source_type";`);
  }
}
