/**
 * Represents the types of transactions that can occur on a gift card.
 * Used to track balance changes and audit gift card activity.
 */
export const GiftCardTransactionType = {
  /** The initial issuance of a gift card, typically when it is purchased */
  ISSUE: "issue",

  /** When a gift card is used to pay for an order, reducing its balance */
  REDEEM: "redeem",

  /** When a purchase made with a gift card is refunded, restoring balance */
  REFUND: "refund",

  /** Manual balance changes such as corrections or administrative adjustments */
  ADJUSTMENT: "adjustment",
} as const;

/**
 * Union type of all valid gift card transaction types.
 */
export type TGiftCardTransactionType =
  (typeof GiftCardTransactionType)[keyof typeof GiftCardTransactionType];
