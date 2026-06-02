/**
 * Defines the types of relationships that can be established between products.
 * Commonly used to power recommendation engines and merchandising logic.
 */
export const ProductRelationType = {
  /** Suggests a higher‑value or premium alternative to increase order value */
  UPSELL: "upsell",

  /** Suggests complementary products typically purchased together */
  "CROSS-SELL": "cross-sell",
} as const;

/**
 * Union type of all valid product relation types.
 */
export type TProductRelationType =
  (typeof ProductRelationType)[keyof typeof ProductRelationType];
