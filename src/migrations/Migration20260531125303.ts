import { Migration } from '@mikro-orm/migrations';

export class Migration20260531125303 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create type "gift_card_transaction_type" as enum ('issue', 'redeem', 'refund', 'adjustment');`);
    this.addSql(`alter table "favorites" drop constraint "favorites_product_id_foreign";`);
    this.addSql(`alter table "favorites" drop constraint "favorites_user_id_foreign";`);

    this.addSql(`alter table "abac_actions" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "abac_resources" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "attributes" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "attribute_values" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "attribute_values" alter column "sort_order" drop default;`);

    this.addSql(`alter table "campaigns" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "campaigns" alter column "ends_at" set default now();`);
    this.addSql(`alter table "campaigns" alter column "ends_at" set not null;`);
    this.addSql(`alter table "campaigns" alter column "is_active" set default false;`);
    this.addSql(`alter table "campaigns" alter column "starts_at" set default now();`);
    this.addSql(`alter table "campaigns" alter column "starts_at" set not null;`);
    this.addSql(`alter table "campaigns" add constraint "campaigns_check" check (starts_at < ends_at);`);

    this.addSql(`alter table "collections" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "gift_cards" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "gift_cards" alter column "currency" type "currency" using ("currency"::"currency");`);
    this.addSql(`alter table "gift_cards" alter column "status" drop default;`);

    this.addSql(`alter table "collection_translations" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "category_translations" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "media_relations" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "media_relations" alter column "position" drop default;`);
    this.addSql(`alter table "media_relations" alter column "role" drop default;`);

    this.addSql(`alter table "media_sets" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "media_set_items" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "media_set_items" alter column "position" drop default;`);

    this.addSql(`alter table "media_tags" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "permissions" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter type "integration_status" add value if not exists 'shopify' before 'disconnected';`);
    this.addSql(`alter type "integration_status" add value if not exists 'telegram' after 'shopify';`);
    this.addSql(`alter type "integration_status" add value if not exists 'google_ads' after 'telegram';`);
    this.addSql(`alter type "integration_status" add value if not exists 'facebook' after 'google_ads';`);

    this.addSql(`alter table "integration_webhook_events" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "integration_logs" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "policies" alter column "effect" drop default;`);
    this.addSql(`alter table "policies" alter column "priority" drop default;`);

    this.addSql(`alter table "policy_bindings" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "product_bundles" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_bundles" alter column "is_dynamic" drop default;`);

    this.addSql(`alter table "products" alter column "availability_status" drop default;`);
    this.addSql(`alter table "products" alter column "base_currency" drop default;`);
    this.addSql(`alter table "products" alter column "publish_status" drop default;`);
    this.addSql(`alter table "products" alter column "type" drop default;`);

    this.addSql(`alter table "product_variants" alter column "availability_status" drop default;`);

    this.addSql(`alter table "product_relations" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_relations" alter column "position" drop default;`);

    this.addSql(`alter table "product_prices" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_prices" alter column "currency" drop default;`);

    this.addSql(`alter table "product_price_history" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "product_bundle_items" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_bundle_items" alter column "quantity" drop default;`);

    this.addSql(`alter table "product_attribute_values" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "collection_products" alter column "position" set default 1;`);

    this.addSql(`alter table "promotion_campaigns" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "promotions" alter column "is_stackable" drop default;`);

    this.addSql(`alter table "promotion_targets" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "promotion_conditions" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "promotion_actions" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "shipping_zones" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "shipping_methods" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "shipping_methods" alter column "base_price" drop default;`);
    this.addSql(`alter table "shipping_methods" alter column "price_per_kg" drop default;`);

    this.addSql(`alter table "product_shipping_rules" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_shipping_rules" alter column "is_excluded" drop default;`);

    this.addSql(`alter table "suppliers" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "product_purchase_prices" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "user_tiers" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "users" alter column "status" drop default;`);

    this.addSql(`alter table "user_attributes" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "user_addresses" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "user_addresses" alter column "country" drop default;`);
    this.addSql(`alter table "user_addresses" alter column "floor" drop default;`);
    this.addSql(`alter table "user_addresses" alter column "is_default" drop default;`);
    this.addSql(`alter table "user_addresses" alter column "side_floor" drop default;`);
    this.addSql(`alter table "user_addresses" alter column "type" drop default;`);

    this.addSql(`alter table "product_versions" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "product_status_history" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_status_history" rename column "changed_at" to "created_at";`);

    this.addSql(`alter table "orders" alter column "discount_amount" drop default;`);
    this.addSql(`alter table "orders" alter column "shipping_amount" drop default;`);
    this.addSql(`alter table "orders" alter column "tax_amount" drop default;`);

    this.addSql(`alter table "shipments" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "reviews" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "reviews" alter column "is_approved" drop default;`);

    this.addSql(`alter table "review_votes" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "returns" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "payments" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "order_items" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "order_items" alter column "discount_amount" drop default;`);
    this.addSql(`alter table "order_items" alter column "tax_amount" drop default;`);

    this.addSql(`alter table "return_items" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "refunds" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "gift_card_transactions" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "gift_card_transactions" alter column "type" type "gift_card_transaction_type" using ("type"::"gift_card_transaction_type");`);
    this.addSql(`alter table "gift_card_transactions" alter column "type" set default 'issue';`);

    this.addSql(`alter table "media_versions" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "favorites" drop constraint "favorites_pkey";`);
    this.addSql(`alter table "favorites" add "id" bigint not null, add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "favorites" add constraint "favorites_product_id_foreign" foreign key ("product_id") references "products" ("id") on update no action;`);
    this.addSql(`alter table "favorites" add constraint "favorites_user_id_foreign" foreign key ("user_id") references "users" ("id") on update no action;`);
    this.addSql(`alter table "favorites" add primary key ("id", "user_id", "product_id");`);

    this.addSql(`alter table "cart_items" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "cart_items" alter column "quantity" drop default;`);
    this.addSql(`alter table "cart_items" add constraint "cart_items_check" check (unit_price >= 0);`);

    this.addSql(`alter table "audit_logs" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "wallets" add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "wallets" alter column "currency" drop default;`);
    this.addSql(`alter table "wallets" alter column "current_balance" drop default;`);

    this.addSql(`alter table "wallet_ledger" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "warehouses" add "updated_at" timestamptz not null default now();`);

    this.addSql(`alter table "product_inventory" add "created_at" timestamptz not null default now();`);
    this.addSql(`alter table "product_inventory" alter column "stock_quantity" drop default;`);
    this.addSql(`alter table "product_inventory" alter column "stock_reserved" drop default;`);
    this.addSql(`alter table "product_inventory" alter column "stock_threshold" drop default;`);

    this.addSql(`alter table "wishlists" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "wishlists" alter column "is_default" drop default;`);
    this.addSql(`alter table "wishlists" alter column "name" drop default;`);

    this.addSql(`alter table "wishlist_items" add "updated_at" timestamptz not null default now();`);
    this.addSql(`alter table "wishlist_items" rename column "added_at" to "created_at";`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "favorites" drop constraint "favorites_user_id_foreign";`);
    this.addSql(`alter table "favorites" drop constraint "favorites_product_id_foreign";`);

    this.addSql(`alter table "gift_card_transactions" alter column "type" drop default;`);

    this.addSql(`alter table "abac_actions" drop column "updated_at";`);

    this.addSql(`alter table "abac_resources" drop column "updated_at";`);

    this.addSql(`alter table "attribute_values" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "attribute_values" alter column "sort_order" set default 0;`);

    this.addSql(`alter table "attributes" drop column "updated_at";`);

    this.addSql(`alter table "audit_logs" drop column "updated_at";`);

    this.addSql(`alter table "campaigns" drop constraint "campaigns_check";`);
    this.addSql(`alter table "campaigns" drop column "updated_at";`);
    this.addSql(`alter table "campaigns" alter column "starts_at" drop default;`);
    this.addSql(`alter table "campaigns" alter column "starts_at" drop not null;`);
    this.addSql(`alter table "campaigns" alter column "ends_at" drop default;`);
    this.addSql(`alter table "campaigns" alter column "ends_at" drop not null;`);
    this.addSql(`alter table "campaigns" alter column "is_active" set default true;`);

    this.addSql(`alter table "cart_items" drop constraint "cart_items_check";`);
    this.addSql(`alter table "cart_items" drop column "updated_at";`);
    this.addSql(`alter table "cart_items" alter column "quantity" set default 1;`);

    this.addSql(`alter table "carts" alter column "is_active" set default true;`);

    this.addSql(`alter table "category_translations" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "collection_products" alter column "position" set default 0;`);

    this.addSql(`alter table "collection_translations" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "collections" drop column "updated_at";`);

    this.addSql(`alter table "favorites" drop constraint "favorites_pkey";`);
    this.addSql(`alter table "favorites" drop column "id", drop column "updated_at";`);
    this.addSql(`alter table "favorites" add constraint "favorites_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;`);
    this.addSql(`alter table "favorites" add constraint "favorites_product_id_foreign" foreign key ("product_id") references "products" ("id") on delete cascade;`);
    this.addSql(`alter table "favorites" add primary key ("user_id", "product_id");`);

    this.addSql(`alter table "gift_card_transactions" drop column "updated_at";`);
    this.addSql(`alter table "gift_card_transactions" alter column "type" drop default;`);
    this.addSql(`alter table "gift_card_transactions" alter column "type" type varchar(20) using ("type"::varchar(20));`);

    this.addSql(`alter table "gift_cards" drop column "updated_at";`);
    this.addSql(`alter table "gift_cards" alter column "currency" type varchar(3) using ("currency"::varchar(3));`);
    this.addSql(`alter table "gift_cards" alter column "status" set default 'active';`);

    this.addSql(`alter table "integration_logs" drop column "updated_at";`);

    this.addSql(`alter table "integration_webhook_events" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "media_relations" drop column "updated_at";`);
    this.addSql(`alter table "media_relations" alter column "role" set default 'gallery';`);
    this.addSql(`alter table "media_relations" alter column "position" set default 0;`);

    this.addSql(`alter table "media_set_items" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "media_set_items" alter column "position" set default 0;`);

    this.addSql(`alter table "media_sets" drop column "updated_at";`);

    this.addSql(`alter table "media_tags" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "media_versions" drop column "updated_at";`);

    this.addSql(`alter table "order_items" drop column "updated_at";`);
    this.addSql(`alter table "order_items" alter column "tax_amount" set default '0';`);
    this.addSql(`alter table "order_items" alter column "discount_amount" set default '0';`);

    this.addSql(`alter table "orders" alter column "tax_amount" set default '0';`);
    this.addSql(`alter table "orders" alter column "shipping_amount" set default '0';`);
    this.addSql(`alter table "orders" alter column "discount_amount" set default '0';`);

    this.addSql(`alter table "payments" drop column "updated_at";`);

    this.addSql(`alter table "permissions" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "policies" alter column "effect" set default 'allow';`);
    this.addSql(`alter table "policies" alter column "priority" set default 0;`);
    this.addSql(`alter table "policies" alter column "is_active" set default true;`);

    this.addSql(`alter table "policy_bindings" drop column "updated_at";`);

    this.addSql(`alter table "product_attribute_values" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "product_bundle_items" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "product_bundle_items" alter column "quantity" set default 1;`);

    this.addSql(`alter table "product_bundles" drop column "updated_at";`);
    this.addSql(`alter table "product_bundles" alter column "is_dynamic" set default false;`);

    this.addSql(`alter table "product_inventory" drop column "created_at";`);
    this.addSql(`alter table "product_inventory" alter column "stock_quantity" set default 0;`);
    this.addSql(`alter table "product_inventory" alter column "stock_reserved" set default 0;`);
    this.addSql(`alter table "product_inventory" alter column "stock_threshold" set default 0;`);

    this.addSql(`alter table "product_price_history" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "product_prices" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "product_prices" alter column "currency" set default 'IRR';`);

    this.addSql(`alter table "product_purchase_prices" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "product_relations" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "product_relations" alter column "position" set default 0;`);

    this.addSql(`alter table "product_shipping_rules" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "product_shipping_rules" alter column "is_excluded" set default false;`);

    this.addSql(`alter table "product_status_history" drop column "updated_at";`);
    this.addSql(`alter table "product_status_history" rename column "created_at" to "changed_at";`);

    this.addSql(`alter table "product_variants" alter column "availability_status" set default 'available';`);

    this.addSql(`alter table "product_versions" drop column "updated_at";`);

    this.addSql(`alter table "products" alter column "type" set default 'simple';`);
    this.addSql(`alter table "products" alter column "availability_status" set default 'available';`);
    this.addSql(`alter table "products" alter column "base_currency" set default 'IRR';`);
    this.addSql(`alter table "products" alter column "publish_status" set default 'draft';`);

    this.addSql(`alter table "promotion_actions" drop column "updated_at";`);

    this.addSql(`alter table "promotion_campaigns" drop column "updated_at";`);
    this.addSql(`alter table "promotion_campaigns" alter column "is_active" set default true;`);

    this.addSql(`alter table "promotion_conditions" drop column "updated_at";`);

    this.addSql(`alter table "promotion_targets" drop column "updated_at";`);

    this.addSql(`alter table "promotions" alter column "is_active" set default true;`);
    this.addSql(`alter table "promotions" alter column "is_stackable" set default false;`);

    this.addSql(`alter table "refunds" drop column "updated_at";`);

    this.addSql(`alter table "return_items" drop column "updated_at";`);

    this.addSql(`alter table "returns" drop column "updated_at";`);

    this.addSql(`alter table "review_votes" drop column "updated_at";`);

    this.addSql(`alter table "reviews" drop column "updated_at";`);
    this.addSql(`alter table "reviews" alter column "is_approved" set default false;`);

    this.addSql(`alter table "shipments" drop column "updated_at";`);

    this.addSql(`alter table "shipping_methods" drop column "updated_at";`);
    this.addSql(`alter table "shipping_methods" alter column "is_active" set default true;`);
    this.addSql(`alter table "shipping_methods" alter column "base_price" set default '0';`);
    this.addSql(`alter table "shipping_methods" alter column "price_per_kg" set default '0';`);

    this.addSql(`alter table "shipping_zones" drop column "updated_at";`);

    this.addSql(`alter table "suppliers" drop column "updated_at";`);

    this.addSql(`alter table "user_addresses" drop column "updated_at";`);
    this.addSql(`alter table "user_addresses" alter column "type" set default 'both';`);
    this.addSql(`alter table "user_addresses" alter column "is_default" set default false;`);
    this.addSql(`alter table "user_addresses" alter column "floor" set default '';`);
    this.addSql(`alter table "user_addresses" alter column "side_floor" set default '';`);
    this.addSql(`alter table "user_addresses" alter column "country" set default 'IR';`);

    this.addSql(`alter table "user_attributes" drop column "updated_at";`);

    this.addSql(`alter table "user_tiers" drop column "updated_at";`);

    this.addSql(`alter table "users" alter column "status" set default 'active';`);

    this.addSql(`alter table "wallet_ledger" drop column "updated_at";`);

    this.addSql(`alter table "wallets" drop column "created_at", drop column "updated_at";`);
    this.addSql(`alter table "wallets" alter column "currency" set default 'IRR';`);
    this.addSql(`alter table "wallets" alter column "current_balance" set default '0';`);

    this.addSql(`alter table "warehouses" drop column "updated_at";`);

    this.addSql(`alter table "wishlist_items" drop column "updated_at";`);
    this.addSql(`alter table "wishlist_items" rename column "created_at" to "added_at";`);

    this.addSql(`alter table "wishlists" drop column "updated_at";`);
    this.addSql(`alter table "wishlists" alter column "name" set default 'Default';`);
    this.addSql(`alter table "wishlists" alter column "is_default" set default false;`);

    this.addSql(`drop type "gift_card_transaction_type";`);
  }

}
