ALTER TABLE "cart_items" DROP CONSTRAINT "fk_cart_items_card";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP CONSTRAINT "fk_cart_items_product";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP CONSTRAINT "fk_cart_items_variant";
--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE restrict ON UPDATE no action;