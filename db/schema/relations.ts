import { relations } from "drizzle-orm/relations";
import {
  attributes,
  attributeValues,
  users,
  auditLogs,
  categories,
  products,
  categoryTranslations,
  collections,
  collectionTranslations,
  giftCards,
  giftCardTransactions,
  orders,
  userAddresses,
  locations,
  media,
  mediaRelationsTable,
  mediaSets,
  mediaSetItems,
  mediaTags,
  mediaTranslations,
  mediaVersions,
  orderItems,
  productVariants,
  payments,
  campaigns,
  policies,
  policyBindings,
  abacResources,
  abacActions,
  productAttributeValues,
  productBundles,
  productBundleItems,
  productInventory,
  warehouses,
  productPriceHistory,
  productPrices,
  productPurchasePrices,
  suppliers,
  productRelations,
  productShippingRules,
  shippingMethods,
  shippingZones,
  productStatusHistory,
  productTranslations,
  productVersions,
  promotions,
  promotionActions,
  promotionConditions,
  promotionTargets,
  promotionUsage,
  refunds,
  returns,
  returnItems,
  reviews,
  reviewVotes,
  roles,
  rolesTranslations,
  shipmentItems,
  shipments,
  userAttributes,
  userTierAssignments,
  userTiers,
  wallets,
  walletLedger,
  wishlists,
  wishlistItems,
  campaignProducts,
  promotionCampaigns,
  promotionCampaignLinks,
  rolePermissions,
  permissions,
  userRoles,
  collectionProducts,
  favorites,
} from "./schema";

export const attributeValuesRelations = relations(
  attributeValues,
  ({ one, many }) => ({
    attribute: one(attributes, {
      fields: [attributeValues.attributeId],
      references: [attributes.id],
    }),
    productAttributeValues: many(productAttributeValues),
  }),
);

export const attributesRelations = relations(attributes, ({ many }) => ({
  attributeValues: many(attributeValues),
  productAttributeValues: many(productAttributeValues),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.actorUserId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLogs),
  orders: many(orders),
  mediaVersions: many(mediaVersions),
  userAddresses: many(userAddresses),
  productStatusHistories: many(productStatusHistory),
  productVersions: many(productVersions),
  promotionUsages: many(promotionUsage),
  reviews: many(reviews),
  reviewVotes: many(reviewVotes),
  userAttributes: many(userAttributes),
  userTierAssignments: many(userTierAssignments),
  wallets: many(wallets),
  wishlists: many(wishlists),
  userRoles: many(userRoles),
  favorites: many(favorites),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
  productVariations: many(productVariants),
  productAttributeValues: many(productAttributeValues),
  productBundles: many(productBundles),
  productBundleItems: many(productBundleItems),
  productRelations_productId: many(productRelations, {
    relationName: "productRelations_productId_products_id",
  }),
  productRelations_relatedProductId: many(productRelations, {
    relationName: "productRelations_relatedProductId_products_id",
  }),
  productShippingRules: many(productShippingRules),
  productStatusHistories: many(productStatusHistory),
  productTranslations: many(productTranslations),
  productVersions: many(productVersions),
  reviews: many(reviews),
  wishlistItems: many(wishlistItems),
  campaignProducts: many(campaignProducts),
  collectionProducts: many(collectionProducts),
  favorites: many(favorites),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  products: many(products),
  category: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categories_parentId_categories_id",
  }),
  categories: many(categories, {
    relationName: "categories_parentId_categories_id",
  }),
  categoryTranslations: many(categoryTranslations),
}));

export const categoryTranslationsRelations = relations(
  categoryTranslations,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoryTranslations.categoryId],
      references: [categories.id],
    }),
  }),
);

export const collectionTranslationsRelations = relations(
  collectionTranslations,
  ({ one }) => ({
    collection: one(collections, {
      fields: [collectionTranslations.collectionId],
      references: [collections.id],
    }),
  }),
);

export const collectionsRelations = relations(collections, ({ many }) => ({
  collectionTranslations: many(collectionTranslations),
  collectionProducts: many(collectionProducts),
}));

export const giftCardTransactionsRelations = relations(
  giftCardTransactions,
  ({ one }) => ({
    giftCard: one(giftCards, {
      fields: [giftCardTransactions.giftCardId],
      references: [giftCards.id],
    }),
    order: one(orders, {
      fields: [giftCardTransactions.orderId],
      references: [orders.id],
    }),
  }),
);

export const giftCardsRelations = relations(giftCards, ({ many }) => ({
  giftCardTransactions: many(giftCardTransactions),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  giftCardTransactions: many(giftCardTransactions),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  userAddress_billingAddressId: one(userAddresses, {
    fields: [orders.billingAddressId],
    references: [userAddresses.id],
    relationName: "orders_billingAddressId_userAddresses_id",
  }),
  userAddress_shippingAddressId: one(userAddresses, {
    fields: [orders.shippingAddressId],
    references: [userAddresses.id],
    relationName: "orders_shippingAddressId_userAddresses_id",
  }),
  orderItems: many(orderItems),
  payments: many(payments),
  promotionUsages: many(promotionUsage),
  returns: many(returns),
  reviews: many(reviews),
  shipments: many(shipments),
}));

export const userAddressesRelations = relations(
  userAddresses,
  ({ one, many }) => ({
    orders_billingAddressId: many(orders, {
      relationName: "orders_billingAddressId_userAddresses_id",
    }),
    orders_shippingAddressId: many(orders, {
      relationName: "orders_shippingAddressId_userAddresses_id",
    }),
    user: one(users, {
      fields: [userAddresses.userId],
      references: [users.id],
    }),
    location_city: one(locations, {
      fields: [userAddresses.city],
      references: [locations.id],
      relationName: "userAddresses_city_locations_id",
    }),
    location_state: one(locations, {
      fields: [userAddresses.state],
      references: [locations.id],
      relationName: "userAddresses_state_locations_id",
    }),
  }),
);

export const locationsRelations = relations(locations, ({ one, many }) => ({
  location: one(locations, {
    fields: [locations.provinceId],
    references: [locations.id],
    relationName: "locations_provinceId_locations_id",
  }),
  locations: many(locations, {
    relationName: "locations_provinceId_locations_id",
  }),
  userAddresses_city: many(userAddresses, {
    relationName: "userAddresses_city_locations_id",
  }),
  userAddresses_state: many(userAddresses, {
    relationName: "userAddresses_state_locations_id",
  }),
}));

export const mediaRelationsRelations = relations(
  mediaRelationsTable,
  ({ one }) => ({
    media: one(media, {
      fields: [mediaRelationsTable.mediaId],
      references: [media.id],
    }),
  }),
);

export const mediaRelations = relations(media, ({ many }) => ({
  mediaRelations: many(mediaRelationsTable),
  mediaSetItems: many(mediaSetItems),
  mediaTags: many(mediaTags),
  mediaTranslations: many(mediaTranslations),
  mediaVersions: many(mediaVersions),
}));

export const mediaSetItemsRelations = relations(mediaSetItems, ({ one }) => ({
  mediaSet: one(mediaSets, {
    fields: [mediaSetItems.mediaSetId],
    references: [mediaSets.id],
  }),
  media: one(media, {
    fields: [mediaSetItems.mediaId],
    references: [media.id],
  }),
}));

export const mediaSetsRelations = relations(mediaSets, ({ many }) => ({
  mediaSetItems: many(mediaSetItems),
}));

export const mediaTagsRelations = relations(mediaTags, ({ one }) => ({
  media: one(media, {
    fields: [mediaTags.mediaId],
    references: [media.id],
  }),
}));

export const mediaTranslationsRelations = relations(
  mediaTranslations,
  ({ one }) => ({
    media: one(media, {
      fields: [mediaTranslations.mediaId],
      references: [media.id],
    }),
  }),
);

export const mediaVersionsRelations = relations(mediaVersions, ({ one }) => ({
  media: one(media, {
    fields: [mediaVersions.mediaId],
    references: [media.id],
  }),
  user: one(users, {
    fields: [mediaVersions.createdBy],
    references: [users.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  productVariation: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
  refunds: many(refunds),
  returnItems: many(returnItems),
  shipmentItems: many(shipmentItems),
}));

export const productVariationsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    orderItems: many(orderItems),
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    productAttributeValues: many(productAttributeValues),
    productBundleItems: many(productBundleItems),
    productInventories: many(productInventory),
    productPriceHistories: many(productPriceHistory),
    productPrices: many(productPrices),
    productPurchasePrices: many(productPurchasePrices),
    wishlistItems: many(wishlistItems),
  }),
);

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
  refunds: many(refunds),
}));

export const policiesRelations = relations(policies, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [policies.campaignId],
    references: [campaigns.id],
  }),
  policyBindings: many(policyBindings),
}));

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  policies: many(policies),
  campaignProducts: many(campaignProducts),
}));

export const policyBindingsRelations = relations(policyBindings, ({ one }) => ({
  policy: one(policies, {
    fields: [policyBindings.policyId],
    references: [policies.id],
  }),
  abacResource: one(abacResources, {
    fields: [policyBindings.resourceId],
    references: [abacResources.id],
  }),
  abacAction: one(abacActions, {
    fields: [policyBindings.actionId],
    references: [abacActions.id],
  }),
}));

export const abacResourcesRelations = relations(abacResources, ({ many }) => ({
  policyBindings: many(policyBindings),
}));

export const abacActionsRelations = relations(abacActions, ({ many }) => ({
  policyBindings: many(policyBindings),
}));

export const productAttributeValuesRelations = relations(
  productAttributeValues,
  ({ one }) => ({
    product: one(products, {
      fields: [productAttributeValues.productId],
      references: [products.id],
    }),
    productVariation: one(productVariants, {
      fields: [productAttributeValues.variationId],
      references: [productVariants.id],
    }),
    attribute: one(attributes, {
      fields: [productAttributeValues.attributeId],
      references: [attributes.id],
    }),
    attributeValue: one(attributeValues, {
      fields: [productAttributeValues.attributeValueId],
      references: [attributeValues.id],
    }),
  }),
);

export const productBundlesRelations = relations(
  productBundles,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productBundles.productId],
      references: [products.id],
    }),
    productBundleItems: many(productBundleItems),
  }),
);

export const productBundleItemsRelations = relations(
  productBundleItems,
  ({ one }) => ({
    productBundle: one(productBundles, {
      fields: [productBundleItems.bundleId],
      references: [productBundles.id],
    }),
    product: one(products, {
      fields: [productBundleItems.productId],
      references: [products.id],
    }),
    productVariation: one(productVariants, {
      fields: [productBundleItems.variationId],
      references: [productVariants.id],
    }),
  }),
);

export const productInventoryRelations = relations(
  productInventory,
  ({ one }) => ({
    productVariation: one(productVariants, {
      fields: [productInventory.variationId],
      references: [productVariants.id],
    }),
    warehouse: one(warehouses, {
      fields: [productInventory.warehouseId],
      references: [warehouses.id],
    }),
  }),
);

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  productInventories: many(productInventory),
}));

export const productPriceHistoryRelations = relations(
  productPriceHistory,
  ({ one }) => ({
    productVariation: one(productVariants, {
      fields: [productPriceHistory.variationId],
      references: [productVariants.id],
    }),
  }),
);

export const productPricesRelations = relations(productPrices, ({ one }) => ({
  productVariation: one(productVariants, {
    fields: [productPrices.variationId],
    references: [productVariants.id],
  }),
}));

export const productPurchasePricesRelations = relations(
  productPurchasePrices,
  ({ one }) => ({
    productVariation: one(productVariants, {
      fields: [productPurchasePrices.variationId],
      references: [productVariants.id],
    }),
    supplier: one(suppliers, {
      fields: [productPurchasePrices.supplierId],
      references: [suppliers.id],
    }),
  }),
);

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  productPurchasePrices: many(productPurchasePrices),
}));

export const productRelationsRelations = relations(
  productRelations,
  ({ one }) => ({
    product_productId: one(products, {
      fields: [productRelations.productId],
      references: [products.id],
      relationName: "productRelations_productId_products_id",
    }),
    product_relatedProductId: one(products, {
      fields: [productRelations.relatedProductId],
      references: [products.id],
      relationName: "productRelations_relatedProductId_products_id",
    }),
  }),
);

export const productShippingRulesRelations = relations(
  productShippingRules,
  ({ one }) => ({
    product: one(products, {
      fields: [productShippingRules.productId],
      references: [products.id],
    }),
    shippingMethod: one(shippingMethods, {
      fields: [productShippingRules.shippingMethodId],
      references: [shippingMethods.id],
    }),
  }),
);

export const shippingMethodsRelations = relations(
  shippingMethods,
  ({ one, many }) => ({
    productShippingRules: many(productShippingRules),
    shippingZone: one(shippingZones, {
      fields: [shippingMethods.zoneId],
      references: [shippingZones.id],
    }),
  }),
);

export const shippingZonesRelations = relations(shippingZones, ({ many }) => ({
  shippingMethods: many(shippingMethods),
}));

export const productStatusHistoryRelations = relations(
  productStatusHistory,
  ({ one }) => ({
    product: one(products, {
      fields: [productStatusHistory.productId],
      references: [products.id],
    }),
    user: one(users, {
      fields: [productStatusHistory.changedBy],
      references: [users.id],
    }),
  }),
);

export const productTranslationsRelations = relations(
  productTranslations,
  ({ one }) => ({
    product: one(products, {
      fields: [productTranslations.productId],
      references: [products.id],
    }),
  }),
);

export const productVersionsRelations = relations(
  productVersions,
  ({ one }) => ({
    product: one(products, {
      fields: [productVersions.productId],
      references: [products.id],
    }),
    user: one(users, {
      fields: [productVersions.createdBy],
      references: [users.id],
    }),
  }),
);

export const promotionActionsRelations = relations(
  promotionActions,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionActions.promotionId],
      references: [promotions.id],
    }),
  }),
);

export const promotionsRelations = relations(promotions, ({ many }) => ({
  promotionActions: many(promotionActions),
  promotionConditions: many(promotionConditions),
  promotionTargets: many(promotionTargets),
  promotionUsages: many(promotionUsage),
  promotionCampaignLinks: many(promotionCampaignLinks),
}));

export const promotionConditionsRelations = relations(
  promotionConditions,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionConditions.promotionId],
      references: [promotions.id],
    }),
  }),
);

export const promotionTargetsRelations = relations(
  promotionTargets,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionTargets.promotionId],
      references: [promotions.id],
    }),
  }),
);

export const promotionUsageRelations = relations(promotionUsage, ({ one }) => ({
  promotion: one(promotions, {
    fields: [promotionUsage.promotionId],
    references: [promotions.id],
  }),
  user: one(users, {
    fields: [promotionUsage.userId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [promotionUsage.orderId],
    references: [orders.id],
  }),
}));

export const refundsRelations = relations(refunds, ({ one }) => ({
  payment: one(payments, {
    fields: [refunds.paymentId],
    references: [payments.id],
  }),
  orderItem: one(orderItems, {
    fields: [refunds.orderItemId],
    references: [orderItems.id],
  }),
}));

export const returnsRelations = relations(returns, ({ one, many }) => ({
  order: one(orders, {
    fields: [returns.orderId],
    references: [orders.id],
  }),
  returnItems: many(returnItems),
}));

export const returnItemsRelations = relations(returnItems, ({ one }) => ({
  return: one(returns, {
    fields: [returnItems.returnId],
    references: [returns.id],
  }),
  orderItem: one(orderItems, {
    fields: [returnItems.orderItemId],
    references: [orderItems.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [reviews.orderId],
    references: [orders.id],
  }),
  reviewVotes: many(reviewVotes),
}));

export const reviewVotesRelations = relations(reviewVotes, ({ one }) => ({
  review: one(reviews, {
    fields: [reviewVotes.reviewId],
    references: [reviews.id],
  }),
  user: one(users, {
    fields: [reviewVotes.userId],
    references: [users.id],
  }),
}));

export const rolesTranslationsRelations = relations(
  rolesTranslations,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolesTranslations.roleId],
      references: [roles.id],
    }),
  }),
);

export const rolesRelations = relations(roles, ({ many }) => ({
  rolesTranslations: many(rolesTranslations),
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

export const shipmentItemsRelations = relations(shipmentItems, ({ one }) => ({
  orderItem: one(orderItems, {
    fields: [shipmentItems.orderItemId],
    references: [orderItems.id],
  }),
  shipment: one(shipments, {
    fields: [shipmentItems.shipmentId],
    references: [shipments.id],
  }),
}));

export const shipmentsRelations = relations(shipments, ({ one, many }) => ({
  shipmentItems: many(shipmentItems),
  order: one(orders, {
    fields: [shipments.orderId],
    references: [orders.id],
  }),
}));

export const userAttributesRelations = relations(userAttributes, ({ one }) => ({
  user: one(users, {
    fields: [userAttributes.userId],
    references: [users.id],
  }),
}));

export const userTierAssignmentsRelations = relations(
  userTierAssignments,
  ({ one }) => ({
    user: one(users, {
      fields: [userTierAssignments.userId],
      references: [users.id],
    }),
    userTier: one(userTiers, {
      fields: [userTierAssignments.tierId],
      references: [userTiers.id],
    }),
  }),
);

export const userTiersRelations = relations(userTiers, ({ many }) => ({
  userTierAssignments: many(userTierAssignments),
}));

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
  walletLedgers: many(walletLedger),
}));

export const walletLedgerRelations = relations(walletLedger, ({ one }) => ({
  wallet: one(wallets, {
    fields: [walletLedger.walletId],
    references: [wallets.id],
  }),
}));

export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
  wishlistItems: many(wishlistItems),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [wishlistItems.wishlistId],
    references: [wishlists.id],
  }),
  product: one(products, {
    fields: [wishlistItems.productId],
    references: [products.id],
  }),
  productVariation: one(productVariants, {
    fields: [wishlistItems.variationId],
    references: [productVariants.id],
  }),
}));

export const campaignProductsRelations = relations(
  campaignProducts,
  ({ one }) => ({
    campaign: one(campaigns, {
      fields: [campaignProducts.campaignId],
      references: [campaigns.id],
    }),
    product: one(products, {
      fields: [campaignProducts.productId],
      references: [products.id],
    }),
  }),
);

export const promotionCampaignLinksRelations = relations(
  promotionCampaignLinks,
  ({ one }) => ({
    promotionCampaign: one(promotionCampaigns, {
      fields: [promotionCampaignLinks.campaignId],
      references: [promotionCampaigns.id],
    }),
    promotion: one(promotions, {
      fields: [promotionCampaignLinks.promotionId],
      references: [promotions.id],
    }),
  }),
);

export const promotionCampaignsRelations = relations(
  promotionCampaigns,
  ({ many }) => ({
    promotionCampaignLinks: many(promotionCampaignLinks),
  }),
);

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const collectionProductsRelations = relations(
  collectionProducts,
  ({ one }) => ({
    collection: one(collections, {
      fields: [collectionProducts.collectionId],
      references: [collections.id],
    }),
    product: one(products, {
      fields: [collectionProducts.productId],
      references: [products.id],
    }),
  }),
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
}));
