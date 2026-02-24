ALTER TABLE "attribute_values" DROP CONSTRAINT "fk_attribute_values_attribute";
--> statement-breakpoint
ALTER TABLE "category_translations" DROP CONSTRAINT "fk_category_translations_category";
--> statement-breakpoint
ALTER TABLE "collection_products" DROP CONSTRAINT "fk_collection_products_collection";
--> statement-breakpoint
ALTER TABLE "collection_products" DROP CONSTRAINT "fk_collection_products_product";
--> statement-breakpoint
ALTER TABLE "collection_translations" DROP CONSTRAINT "fk_collection_translations_collection";
--> statement-breakpoint
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "fk_product_attribute_values_product";
--> statement-breakpoint
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "fk_product_attribute_values_variant";
--> statement-breakpoint
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "fk_product_attribute_values_attribute";
--> statement-breakpoint
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "fk_product_attribute_values_attribute_value";
--> statement-breakpoint
ALTER TABLE "product_bundle_items" DROP CONSTRAINT "fk_bundle_items_bundle";
--> statement-breakpoint
ALTER TABLE "product_bundle_items" DROP CONSTRAINT "fk_bundle_items_product";
--> statement-breakpoint
ALTER TABLE "product_bundle_items" DROP CONSTRAINT "fk_bundle_items_variant";
--> statement-breakpoint
ALTER TABLE "product_bundles" DROP CONSTRAINT "fk_product_bundles_product";
--> statement-breakpoint
ALTER TABLE "product_inventory" DROP CONSTRAINT "fk_product_inventory_variant";
--> statement-breakpoint
ALTER TABLE "product_inventory" DROP CONSTRAINT "fk_product_inventory_warehouse";
--> statement-breakpoint
ALTER TABLE "product_price_history" DROP CONSTRAINT "fk_product_price_history_variants_id";
--> statement-breakpoint
ALTER TABLE "product_prices" DROP CONSTRAINT "fk_product_prices_variant_id";
--> statement-breakpoint
ALTER TABLE "product_relations" DROP CONSTRAINT "fk_product_relations_product";
--> statement-breakpoint
ALTER TABLE "product_relations" DROP CONSTRAINT "fk_product_relations_related";
--> statement-breakpoint
ALTER TABLE "product_shipping_rules" DROP CONSTRAINT "fk_product_shipping_rules_product";
--> statement-breakpoint
ALTER TABLE "product_shipping_rules" DROP CONSTRAINT "fk_product_shipping_rules_method";
--> statement-breakpoint
ALTER TABLE "product_status_history" DROP CONSTRAINT "fk_product_status_history_product";
--> statement-breakpoint
ALTER TABLE "product_status_history" DROP CONSTRAINT "fk_product_status_history_user";
--> statement-breakpoint
ALTER TABLE "product_translations" DROP CONSTRAINT "fk_product_translations_product";
--> statement-breakpoint
ALTER TABLE "product_variants" DROP CONSTRAINT "fk_product_variants_product";
--> statement-breakpoint
ALTER TABLE "product_versions" DROP CONSTRAINT "fk_product_versions_product";
--> statement-breakpoint
ALTER TABLE "product_versions" DROP CONSTRAINT "fk_product_versions_user";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "fk_products_category";
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "fk_favorites_user";
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "fk_favorites_product";
--> statement-breakpoint
ALTER TABLE "review_votes" DROP CONSTRAINT "fk_review_votes_review";
--> statement-breakpoint
ALTER TABLE "review_votes" DROP CONSTRAINT "fk_review_votes_user";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews_user";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews_product";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "fk_reviews_order";
--> statement-breakpoint
ALTER TABLE "user_addresses" DROP CONSTRAINT "fk_user_addresses_user";
--> statement-breakpoint
ALTER TABLE "user_addresses" DROP CONSTRAINT "fk_user_addresses_city";
--> statement-breakpoint
ALTER TABLE "user_addresses" DROP CONSTRAINT "fk_user_addresses_state";
--> statement-breakpoint
ALTER TABLE "user_attributes" DROP CONSTRAINT "fk_user_attributes_user";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "fk_user_roles_user";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "fk_user_roles_role";
--> statement-breakpoint
ALTER TABLE "user_tier_assignments" DROP CONSTRAINT "fk_user_tier_assignments_user";
--> statement-breakpoint
ALTER TABLE "user_tier_assignments" DROP CONSTRAINT "fk_user_tier_assignments_tier";
--> statement-breakpoint
ALTER TABLE "wallet_ledger" DROP CONSTRAINT "fk_wallet_ledger_wallet";
--> statement-breakpoint
ALTER TABLE "wallets" DROP CONSTRAINT "fk_wallets_user";
--> statement-breakpoint
ALTER TABLE "wishlist_items" DROP CONSTRAINT "fk_wishlist_items_wishlist";
--> statement-breakpoint
ALTER TABLE "wishlist_items" DROP CONSTRAINT "fk_wishlist_items_product";
--> statement-breakpoint
ALTER TABLE "wishlist_items" DROP CONSTRAINT "fk_wishlist_items_variation";
--> statement-breakpoint
ALTER TABLE "wishlists" DROP CONSTRAINT "fk_wishlists_user";
--> statement-breakpoint
ALTER TABLE "shipping_methods" DROP CONSTRAINT "fk_shipping_methods_zone";
--> statement-breakpoint
ALTER TABLE "campaign_products" DROP CONSTRAINT "fk_campaign_products_campaign";
--> statement-breakpoint
ALTER TABLE "campaign_products" DROP CONSTRAINT "fk_campaign_products_product";
--> statement-breakpoint
ALTER TABLE "promotion_actions" DROP CONSTRAINT "fk_promotion_actions_promotion";
--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" DROP CONSTRAINT "fk_promotion_campaign_links_campaign";
--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" DROP CONSTRAINT "fk_promotion_campaign_links_promotion";
--> statement-breakpoint
ALTER TABLE "promotion_conditions" DROP CONSTRAINT "fk_promotion_conditions_promotion";
--> statement-breakpoint
ALTER TABLE "promotion_targets" DROP CONSTRAINT "fk_promotion_targets_promotion";
--> statement-breakpoint
ALTER TABLE "promotion_usage" DROP CONSTRAINT "fk_promotion_usage_promotion";
--> statement-breakpoint
ALTER TABLE "promotion_usage" DROP CONSTRAINT "fk_promotion_usage_user";
--> statement-breakpoint
ALTER TABLE "promotion_usage" DROP CONSTRAINT "fk_promotion_usage_order";
--> statement-breakpoint
ALTER TABLE "media_relations" DROP CONSTRAINT "fk_media_relations_media";
--> statement-breakpoint
ALTER TABLE "media_set_items" DROP CONSTRAINT "fk_media_set_items_set";
--> statement-breakpoint
ALTER TABLE "media_set_items" DROP CONSTRAINT "fk_media_set_items_media";
--> statement-breakpoint
ALTER TABLE "media_tags" DROP CONSTRAINT "fk_media_tags_media";
--> statement-breakpoint
ALTER TABLE "media_translations" DROP CONSTRAINT "fk_media_translations_media";
--> statement-breakpoint
ALTER TABLE "media_versions" DROP CONSTRAINT "fk_media_versions_media";
--> statement-breakpoint
ALTER TABLE "media_versions" DROP CONSTRAINT "fk_media_versions_user";
--> statement-breakpoint
ALTER TABLE "carts" DROP CONSTRAINT "fk_carts_user";
--> statement-breakpoint
ALTER TABLE "gift_card_transactions" DROP CONSTRAINT "fk_gift_card_id";
--> statement-breakpoint
ALTER TABLE "gift_card_transactions" DROP CONSTRAINT "fk_gift_card_order_id";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_items_order";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_items_product";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_items_variant";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_user";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_billing_address";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_shipping_address";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "fk_payments_order";
--> statement-breakpoint
ALTER TABLE "refunds" DROP CONSTRAINT "fk_refunds_payment";
--> statement-breakpoint
ALTER TABLE "refunds" DROP CONSTRAINT "fk_refunds_order_item";
--> statement-breakpoint
ALTER TABLE "return_items" DROP CONSTRAINT "fk_return_items_return";
--> statement-breakpoint
ALTER TABLE "return_items" DROP CONSTRAINT "fk_return_items_order_item";
--> statement-breakpoint
ALTER TABLE "returns" DROP CONSTRAINT "fk_returns_order";
--> statement-breakpoint
ALTER TABLE "shipments" DROP CONSTRAINT "fk_order_id";
--> statement-breakpoint
ALTER TABLE "shipment_items" DROP CONSTRAINT "fk_order_item_id";
--> statement-breakpoint
ALTER TABLE "shipment_items" DROP CONSTRAINT "fk_shipment_id";
--> statement-breakpoint
ALTER TABLE "policies" DROP CONSTRAINT "fk_policies_campaign";
--> statement-breakpoint
ALTER TABLE "policy_bindings" DROP CONSTRAINT "fk_policy_bindings_policy";
--> statement-breakpoint
ALTER TABLE "policy_bindings" DROP CONSTRAINT "fk_policy_bindings_resource";
--> statement-breakpoint
ALTER TABLE "policy_bindings" DROP CONSTRAINT "fk_policy_bindings_action";
--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_role";
--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_permission";
--> statement-breakpoint
ALTER TABLE "roles_translations" DROP CONSTRAINT "fk_role_id";
--> statement-breakpoint
ALTER TABLE "audit_logs" DROP CONSTRAINT "fk_audit_logs_actor";
--> statement-breakpoint
ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_translations" ADD CONSTRAINT "collection_translations_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attribute_value_id_attribute_values_id_fk" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."attribute_values"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "product_bundle_items_bundle_id_product_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."product_bundles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "product_bundle_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "product_bundle_items_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_bundles" ADD CONSTRAINT "product_bundles_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_price_history" ADD CONSTRAINT "product_price_history_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "product_relations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "product_relations_related_product_id_products_id_fk" FOREIGN KEY ("related_product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_shipping_rules" ADD CONSTRAINT "product_shipping_rules_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_shipping_rules" ADD CONSTRAINT "product_shipping_rules_shipping_method_id_shipping_methods_id_fk" FOREIGN KEY ("shipping_method_id") REFERENCES "public"."shipping_methods"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_status_history" ADD CONSTRAINT "product_status_history_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_status_history" ADD CONSTRAINT "product_status_history_changed_by_users_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_versions" ADD CONSTRAINT "product_versions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_versions" ADD CONSTRAINT "product_versions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_votes" ADD CONSTRAINT "review_votes_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_votes" ADD CONSTRAINT "review_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_city_locations_id_fk" FOREIGN KEY ("city") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_state_locations_id_fk" FOREIGN KEY ("state") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_attributes" ADD CONSTRAINT "user_attributes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tier_assignments" ADD CONSTRAINT "user_tier_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tier_assignments" ADD CONSTRAINT "user_tier_assignments_tier_id_user_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."user_tiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_ledger" ADD CONSTRAINT "wallet_ledger_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_wishlist_id_wishlists_id_fk" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_methods" ADD CONSTRAINT "shipping_methods_zone_id_shipping_zones_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."shipping_zones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_products" ADD CONSTRAINT "campaign_products_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_products" ADD CONSTRAINT "campaign_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_actions" ADD CONSTRAINT "promotion_actions_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" ADD CONSTRAINT "promotion_campaign_links_campaign_id_promotion_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."promotion_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_campaign_links" ADD CONSTRAINT "promotion_campaign_links_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_conditions" ADD CONSTRAINT "promotion_conditions_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_targets" ADD CONSTRAINT "promotion_targets_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "promotion_usage_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "promotion_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_usage" ADD CONSTRAINT "promotion_usage_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_relations" ADD CONSTRAINT "media_relations_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_set_items" ADD CONSTRAINT "media_set_items_media_set_id_media_sets_id_fk" FOREIGN KEY ("media_set_id") REFERENCES "public"."media_sets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_set_items" ADD CONSTRAINT "media_set_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_translations" ADD CONSTRAINT "media_translations_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_versions" ADD CONSTRAINT "media_versions_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_versions" ADD CONSTRAINT "media_versions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift_card_transactions" ADD CONSTRAINT "gift_card_transactions_gift_card_id_gift_cards_id_fk" FOREIGN KEY ("gift_card_id") REFERENCES "public"."gift_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gift_card_transactions" ADD CONSTRAINT "gift_card_transactions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_billing_address_id_user_addresses_id_fk" FOREIGN KEY ("billing_address_id") REFERENCES "public"."user_addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_user_addresses_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."user_addresses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "return_items" ADD CONSTRAINT "return_items_return_id_returns_id_fk" FOREIGN KEY ("return_id") REFERENCES "public"."returns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "return_items" ADD CONSTRAINT "return_items_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "returns" ADD CONSTRAINT "returns_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "policies_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "policy_bindings_policy_id_policies_id_fk" FOREIGN KEY ("policy_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "policy_bindings_resource_id_abac_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."abac_resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "policy_bindings_action_id_abac_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."abac_actions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_translations" ADD CONSTRAINT "roles_translations_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;