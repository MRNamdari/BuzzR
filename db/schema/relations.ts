import { relations } from "drizzle-orm/relations";
import {
  users,
  auditLogs,
  categories,
  collections,
  collectionTranslations,
  media,
  mediaTags,
  mediaRelationsTable,
  mediaSets,
  mediaSetItems,
  orders,
  orderItems,
  products,
  productVariations,
  mediaVersions,
  userAddresses,
  payments,
  campaigns,
  policies,
  productAttributeValues,
  attributes,
  attributeValues,
  productBundles,
  productInventory,
  warehouses,
  productPrices,
  productPriceHistory,
  productPurchasePrices,
  suppliers,
  productTranslations,
  productRelations,
  productShippingRules,
  shippingMethods,
  productStatusHistory,
  productVersions,
  reviews,
  shipmentItems,
  shipments,
  returns,
  reviewVotes,
  roles,
  rolesTranslations,
  locations,
  shippingZones,
  userAttributes,
  userTierAssignments,
  userTiers,
  wallets,
  wishlists,
  wishlistItems,
  categoryTranslations,
  giftCards,
  giftCardTransactions,
  mediaTranslations,
  policyBindings,
  abacResources,
  abacActions,
  productBundleItems,
  refunds,
  returnItems,
  promotions,
  promotionTargets,
  walletLedger,
  promotionConditions,
  promotionActions,
  promotionUsage,
  campaignProducts,
  rolePermissions,
  permissions,
  userRoles,
  promotionCampaigns,
  promotionCampaignLinks,
  collectionProducts,
  favorites,
} from "./schema";

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.actorUserId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLogs),
  mediaVersions: many(mediaVersions),
  orders: many(orders),
  productStatusHistories: many(productStatusHistory),
  productVersions: many(productVersions),
  reviews: many(reviews),
  reviewVotes: many(reviewVotes),
  userAddresses: many(userAddresses),
  userAttributes: many(userAttributes),
  userTierAssignments: many(userTierAssignments),
  wallets: many(wallets),
  wishlists: many(wishlists),
  promotionUsages: many(promotionUsage),
  userRoles: many(userRoles),
  favorites: many(favorites),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  category: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categories_parentId_categories_id",
  }),
  categories: many(categories, {
    relationName: "categories_parentId_categories_id",
  }),
  products: many(products),
  categoryTranslations: many(categoryTranslations),
}));

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

export const mediaTagsRelations = relations(mediaTags, ({ one }) => ({
  media: one(media, {
    fields: [mediaTags.mediaId],
    references: [media.id],
  }),
}));

export const mediaRelations = relations(media, ({ many }) => ({
  mediaTags: many(mediaTags),
  mediaRelations: many(mediaRelationsTable),
  mediaSetItems: many(mediaSetItems),
  mediaVersions: many(mediaVersions),
  mediaTranslations: many(mediaTranslations),
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

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  productVariation: one(productVariations, {
    fields: [orderItems.variationId],
    references: [productVariations.id],
  }),
  shipmentItems: many(shipmentItems),
  refunds: many(refunds),
  returnItems: many(returnItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
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
  payments: many(payments),
  reviews: many(reviews),
  returns: many(returns),
  shipments: many(shipments),
  giftCardTransactions: many(giftCardTransactions),
  promotionUsages: many(promotionUsage),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  orderItems: many(orderItems),
  productAttributeValues: many(productAttributeValues),
  productBundles: many(productBundles),
  productTranslations: many(productTranslations),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productVariations: many(productVariations),
  productRelations_productId: many(productRelations, {
    relationName: "productRelations_productId_products_id",
  }),
  productRelations_relatedProductId: many(productRelations, {
    relationName: "productRelations_relatedProductId_products_id",
  }),
  productShippingRules: many(productShippingRules),
  productStatusHistories: many(productStatusHistory),
  productVersions: many(productVersions),
  reviews: many(reviews),
  wishlistItems: many(wishlistItems),
  productBundleItems: many(productBundleItems),
  campaignProducts: many(campaignProducts),
  collectionProducts: many(collectionProducts),
  favorites: many(favorites),
}));

export const productVariationsRelations = relations(
  productVariations,
  ({ one, many }) => ({
    orderItems: many(orderItems),
    productAttributeValues: many(productAttributeValues),
    productInventories: many(productInventory),
    productPrices: many(productPrices),
    productPriceHistories: many(productPriceHistory),
    productPurchasePrices: many(productPurchasePrices),
    product: one(products, {
      fields: [productVariations.productId],
      references: [products.id],
    }),
    wishlistItems: many(wishlistItems),
    productBundleItems: many(productBundleItems),
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

export const productAttributeValuesRelations = relations(
  productAttributeValues,
  ({ one }) => ({
    product: one(products, {
      fields: [productAttributeValues.productId],
      references: [products.id],
    }),
    productVariation: one(productVariations, {
      fields: [productAttributeValues.variationId],
      references: [productVariations.id],
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

export const attributesRelations = relations(attributes, ({ many }) => ({
  productAttributeValues: many(productAttributeValues),
  attributeValues: many(attributeValues),
}));

export const attributeValuesRelations = relations(
  attributeValues,
  ({ one, many }) => ({
    productAttributeValues: many(productAttributeValues),
    attribute: one(attributes, {
      fields: [attributeValues.attributeId],
      references: [attributes.id],
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

export const productInventoryRelations = relations(
  productInventory,
  ({ one }) => ({
    productVariation: one(productVariations, {
      fields: [productInventory.variationId],
      references: [productVariations.id],
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

export const productPricesRelations = relations(productPrices, ({ one }) => ({
  productVariation: one(productVariations, {
    fields: [productPrices.variationId],
    references: [productVariations.id],
  }),
}));

export const productPriceHistoryRelations = relations(
  productPriceHistory,
  ({ one }) => ({
    productVariation: one(productVariations, {
      fields: [productPriceHistory.variationId],
      references: [productVariations.id],
    }),
  }),
);

export const productPurchasePricesRelations = relations(
  productPurchasePrices,
  ({ one }) => ({
    productVariation: one(productVariations, {
      fields: [productPurchasePrices.variationId],
      references: [productVariations.id],
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

export const productTranslationsRelations = relations(
  productTranslations,
  ({ one }) => ({
    product: one(products, {
      fields: [productTranslations.productId],
      references: [products.id],
    }),
  }),
);

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

export const returnsRelations = relations(returns, ({ one, many }) => ({
  order: one(orders, {
    fields: [returns.orderId],
    references: [orders.id],
  }),
  returnItems: many(returnItems),
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

export const locationsRelations = relations(locations, ({ one, many }) => ({
  userAddresses_city: many(userAddresses, {
    relationName: "userAddresses_city_locations_id",
  }),
  userAddresses_state: many(userAddresses, {
    relationName: "userAddresses_state_locations_id",
  }),
  location: one(locations, {
    fields: [locations.provinceId],
    references: [locations.id],
    relationName: "locations_provinceId_locations_id",
  }),
  locations: many(locations, {
    relationName: "locations_provinceId_locations_id",
  }),
}));

export const shippingZonesRelations = relations(shippingZones, ({ many }) => ({
  shippingMethods: many(shippingMethods),
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
  productVariation: one(productVariations, {
    fields: [wishlistItems.variationId],
    references: [productVariations.id],
  }),
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

export const mediaTranslationsRelations = relations(
  mediaTranslations,
  ({ one }) => ({
    media: one(media, {
      fields: [mediaTranslations.mediaId],
      references: [media.id],
    }),
  }),
);

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
    productVariation: one(productVariations, {
      fields: [productBundleItems.variationId],
      references: [productVariations.id],
    }),
  }),
);

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

export const promotionTargetsRelations = relations(
  promotionTargets,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionTargets.promotionId],
      references: [promotions.id],
    }),
  }),
);

export const promotionsRelations = relations(promotions, ({ many }) => ({
  promotionTargets: many(promotionTargets),
  promotionConditions: many(promotionConditions),
  promotionActions: many(promotionActions),
  promotionUsages: many(promotionUsage),
  promotionCampaignLinks: many(promotionCampaignLinks),
}));

export const walletLedgerRelations = relations(walletLedger, ({ one }) => ({
  wallet: one(wallets, {
    fields: [walletLedger.walletId],
    references: [wallets.id],
  }),
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

export const promotionActionsRelations = relations(
  promotionActions,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionActions.promotionId],
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
