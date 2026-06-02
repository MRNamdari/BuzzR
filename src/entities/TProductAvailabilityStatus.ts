/**
 * Represents all possible availability states for a product.
 * These values are typically used to control UI badges, purchase options,
 * and messaging shown to customers.
 */
export const ProductAvailabilityStatus = {
  /** Product is in stock and can be purchased immediately */
  AVAILABLE: "available",

  /** Product can be ordered before it is officially released; ships on release date */
  PREORDER: "preorder",

  /** Product is available for early purchase but may have limited access or conditions */
  PRESALE: "presale",

  /** Product is not yet released; no orders accepted but release is upcoming */
  COMING_SOON: "coming_soon",

  /** Product requires contacting support or sales to complete the purchase */
  CALL_TO_ORDER: "call_to_order",

  /** Product is temporarily unavailable; expected to return in stock */
  OUT_OF_STOCK: "out_of_stock",

  /** Product is permanently unavailable and will not be restocked */
  DISCONTINUED: "discontinued",
} as const;

/**
 * Union type of all possible product availability status values.
 */
export type TProductAvailabilityStatus =
  (typeof ProductAvailabilityStatus)[keyof typeof ProductAvailabilityStatus];
