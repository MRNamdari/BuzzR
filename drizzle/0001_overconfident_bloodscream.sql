ALTER TABLE "product_purchase_prices" DROP CONSTRAINT "fk_product_purchase_prices_variants_id";
--> statement-breakpoint
ALTER TABLE "product_purchase_prices" DROP CONSTRAINT "fk_product_purchase_prices_supplier_id";
--> statement-breakpoint
ALTER TABLE "product_purchase_prices" ADD CONSTRAINT "product_purchase_prices_variation_id_product_variants_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_purchase_prices" ADD CONSTRAINT "product_purchase_prices_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE set null ON UPDATE no action;