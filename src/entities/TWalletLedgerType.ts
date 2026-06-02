/**
 * Represents the direction or nature of a wallet ledger transaction.
 * Determines whether funds are added, removed, or adjusted.
 */
export const WalletLedgerType = {
  /** Funds are added to the wallet balance */
  CREDIT: "credit",

  /** Funds are deducted from the wallet balance */
  DEBIT: "debit",

  /** Funds are modified without a direct credit or debit (e.g., corrections) */
  ADJUSTMENT: "adjustment",
} as const;

/**
 * Union type of all valid wallet ledger transaction types.
 */
export type TWalletLedgerType =
  (typeof WalletLedgerType)[keyof typeof WalletLedgerType];
