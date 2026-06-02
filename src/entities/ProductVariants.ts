import { defineEntity, p } from "@mikro-orm/core";
import { CampaignProducts } from "./CampaignProducts";
import { CartItems } from "./CartItems";
import { CollectionProducts } from "./CollectionProducts";
import { Favorites } from "./Favorites";
import { OrderItems } from "./OrderItems";
import { ProductAttributeValues } from "./ProductAttributeValues";
import { ProductBundleItems } from "./ProductBundleItems";
import { ProductInventory } from "./ProductInventory";
import { ProductPriceHistory } from "./ProductPriceHistory";
import { ProductPrices } from "./ProductPrices";
import { ProductPurchasePrices } from "./ProductPurchasePrices";
import { ProductRelations } from "./ProductRelations";
import { ProductShippingRules } from "./ProductShippingRules";
import { Products } from "./Products";
import { Reviews } from "./Reviews";
import { ProductAvailabilityStatus } from "./TProductAvailabilityStatus";
import { WishlistItems } from "./WishlistItems";
import { BaseEntity } from "./Base";

const ProductVariantsSchema = defineEntity({
  name: "product_variants",
  extends: BaseEntity,
  properties: {
    product: () =>
      p
        .manyToOne(Products)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_product_variants_product_id"),
    sku: p.string().length(100).nullable().unique("product_variants_sku_key"),
    name: p.string().nullable(),
    basePrice: p.decimal(),
    availabilityStatus: p
      .enum(() => ProductAvailabilityStatus)
      .nativeEnumName("product_availability_status"),
    deletedAt: p.datetime().nullable(),
    campaignProductsCollection: () =>
      p.oneToMany(CampaignProducts).mappedBy("variant"),
    cartItemsCollection: () => p.oneToMany(CartItems).mappedBy("variant"),
    collectionProductsCollection: () =>
      p.oneToMany(CollectionProducts).mappedBy("productVariant"),
    favoritesCollection: () => p.oneToMany(Favorites).mappedBy("variant"),
    orderItemsCollection: () => p.oneToMany(OrderItems).mappedBy("variant"),
    productAttributeValuesCollection: () =>
      p.oneToMany(ProductAttributeValues).mappedBy("variation"),
    productBundleItemsCollection: () =>
      p.oneToMany(ProductBundleItems).mappedBy("variant"),
    productInventoryCollection: () =>
      p.oneToMany(ProductInventory).mappedBy("variation"),
    productPriceHistoryCollection: () =>
      p.oneToMany(ProductPriceHistory).mappedBy("variant"),
    productPricesCollection: () =>
      p.oneToMany(ProductPrices).mappedBy("variant"),
    productPurchasePricesCollection: () =>
      p.oneToMany(ProductPurchasePrices).mappedBy("variant"),
    productRelationsCollection: () =>
      p.oneToMany(ProductRelations).mappedBy("relatedVariant"),
    productShippingRulesCollection: () =>
      p.oneToMany(ProductShippingRules).mappedBy("productVariant"),
    reviewsCollection: () => p.oneToMany(Reviews).mappedBy("variant"),
    wishlistItemsCollection: () =>
      p.oneToMany(WishlistItems).mappedBy("variation"),
  },
});

export class ProductVariants extends ProductVariantsSchema.class {}

ProductVariantsSchema.setClass(ProductVariants);
