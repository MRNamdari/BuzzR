ALTER TABLE "order_items" DROP CONSTRAINT "fk_order_items_variant";
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "variant_id" bigint;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "description" varchar(2000);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "notes" varchar(2000);--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_variant" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "variation_id";