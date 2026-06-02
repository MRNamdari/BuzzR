/**
 * Represents the lifecycle state of a payment.
 * Used to control order flow, capture logic, refunds, and reconciliation.
 */
export const PaymentStatus = {
  /** Payment has been created but not yet authorized or processed */
  PENDING: "pending",

  /** Payment has been authorized but funds are not yet captured */
  AUTHORIZED: "authorized",

  /** Funds have been successfully captured from the customer */
  CAPTURED: "captured",

  /** Payment attempt failed due to gateway or validation issues */
  FAILED: "failed",

  /** Payment was canceled before completion */
  CANCELED: "canceled",

  /** Full refund has been issued back to the customer */
  REFUNDED: "refunded",

  /** Partial refund has been issued */
  PARTIALLY_REFUNDED: "partially_refunded",

  /** Payment is under dispute or chargeback investigation */
  DISPUTED: "disputed",

  /** Payment is fully settled and reconciled in the financial system */
  SETTLED: "settled",
} as const;

/**
 * Union type of all valid payment statuses.
 */
export type TPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
