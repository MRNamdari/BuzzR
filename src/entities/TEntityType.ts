/**
 * Represents the different entity types used throughout the catalog system.
 * Helps determine routing, validation rules, and UI behavior.
 */
export const EntityType = {
  /** A product category used to group related products */
  CATEGORY: "category",

  /** A curated collection of products, often used for merchandising */
  COLLECTION: "collection",

  /** A standalone product entity */
  PRODUCT: "product",

  /** A specific purchasable variant of a product (e.g., size, color) */
  PRODUCT_VARIANT: "product_variant",
} as const;

/**
 * Union type of all valid entity types.
 */
export type TEntityType = (typeof EntityType)[keyof typeof EntityType];
