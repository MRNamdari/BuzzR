/**
 * Represents the origin of a wallet ledger entry.
 * Used to track how funds were added, removed, or adjusted in a customer's wallet.
 */
export const WalletLedgerSourceType = {
  /** Funds added or deducted as part of an order transaction */
  ORDER: "order",

  /** Funds issued or redeemed through a gift card */
  GIFT_CARD: "gift_card",

  /** Funds returned to the wallet as part of a refund process */
  REFUND: "refund",

  /** Funds manually adjusted by an admin or system process */
  MANUAL: "manual",
} as const;

/**
 * Union type of all valid wallet ledger source types.
 */
export type TWalletLedgerSourceType =
  (typeof WalletLedgerSourceType)[keyof typeof WalletLedgerSourceType];
