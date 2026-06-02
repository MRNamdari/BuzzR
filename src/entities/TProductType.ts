/**
 * Defines the structural type of a product.
 * Used to determine pricing behavior, variant handling, and UI configuration.
 */
export const ProductType = {
  /** A standalone product with a single price and no variations */
  SIMPLE: "simple",

  /** A product that contains multiple variants (e.g., sizes, colors) */
  VARIABLE: "variable",
} as const;

/**
 * Union type of all valid product types.
 */
export type TProductType = (typeof ProductType)[keyof typeof ProductType];
