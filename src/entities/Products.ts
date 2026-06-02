import { defineEntity, p } from "@mikro-orm/core";
import { CampaignProducts } from "./CampaignProducts";
import { CartItems } from "./CartItems";
import { Categories } from "./Categories";
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
import { ProductStatusHistory } from "./ProductStatusHistory";
import { ProductTranslations } from "./ProductTranslations";
import { ProductVariants } from "./ProductVariants";
import { ProductVersions } from "./ProductVersions";
import { Reviews } from "./Reviews";
import { Currency } from "./TCurrency";
import { ProductAvailabilityStatus } from "./TProductAvailabilityStatus";
import { ProductPublishStatus } from "./TProductPublishStatus";
import { ProductType } from "./TProductType";
import { WishlistItems } from "./WishlistItems";
import { BaseEntity } from "./Base";

const ProductsSchema = defineEntity({
  name: "products",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    slug: p
      .string()
      .defaultRaw(`gen_random_uuid()`)
      .unique("products_slug_key"),
    description: p.text().nullable(),
    category: () =>
      p.manyToOne(Categories).ref().updateRule("no action").nullable(),
    type: p
      .enum(() => ProductType)
      .nativeEnumName("product_type")
      .index("idx_products_type"),
    availabilityStatus: p
      .enum(() => ProductAvailabilityStatus)
      .nativeEnumName("product_availability_status")
      .index("idx_products_availability_status"),
    availableFrom: p.datetime().nullable(),
    baseCurrency: p.enum(() => Currency).nativeEnumName("currency"),
    basePrice: p.decimal(),
    taxClassId: p.bigint().nullable(),
    publishStatus: p
      .enum(() => ProductPublishStatus)
      .nativeEnumName("product_publish_status")
      .index("idx_products_publish_status"),
    publishAt: p.datetime().nullable(),
    deletedAt: p.datetime().nullable().index("idx_products_deleted_at"),
    campaignProductsCollection: () =>
      p.oneToMany(CampaignProducts).mappedBy("product"),
    cartItemsCollection: () => p.oneToMany(CartItems).mappedBy("product"),
    collectionProductsCollection: () =>
      p.oneToMany(CollectionProducts).mappedBy("product"),
    favoritesCollection: () => p.oneToMany(Favorites).mappedBy("product"),
    orderItemsCollection: () => p.oneToMany(OrderItems).mappedBy("product"),
    productAttributeValuesCollection: () =>
      p.oneToMany(ProductAttributeValues).mappedBy("product"),
    productBundleItemsCollection: () =>
      p.oneToMany(ProductBundleItems).mappedBy("product"),
    productInventoryCollection: () =>
      p.oneToMany(ProductInventory).mappedBy("product"),
    productPriceHistoryCollection: () =>
      p.oneToMany(ProductPriceHistory).mappedBy("product"),
    productPricesCollection: () =>
      p.oneToMany(ProductPrices).mappedBy("product"),
    productPurchasePricesCollection: () =>
      p.oneToMany(ProductPurchasePrices).mappedBy("product"),
    productRelationsCollection: () =>
      p.oneToMany(ProductRelations).mappedBy("product"),
    productRelationsCollection1: () =>
      p.oneToMany(ProductRelations).mappedBy("relatedProduct"),
    productShippingRulesCollection: () =>
      p.oneToMany(ProductShippingRules).mappedBy("product"),
    productStatusHistoryCollection: () =>
      p.oneToMany(ProductStatusHistory).mappedBy("product"),
    productTranslationsCollection: () =>
      p.oneToMany(ProductTranslations).mappedBy("product"),
    productVariantsCollection: () =>
      p.oneToMany(ProductVariants).mappedBy("product"),
    productVersionsCollection: () =>
      p.oneToMany(ProductVersions).mappedBy("product"),
    reviewsCollection: () => p.oneToMany(Reviews).mappedBy("product"),
    wishlistItemsCollection: () =>
      p.oneToMany(WishlistItems).mappedBy("product"),
  },
});

export class Products extends ProductsSchema.class {}

ProductsSchema.setClass(Products);
