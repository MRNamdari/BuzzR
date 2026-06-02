/**
 * Represents the purpose of a customer's address.
 * Used to determine how the address is applied during checkout,
 * invoicing, and fulfillment.
 */
export const AddressType = {
  /** Address used for billing, invoicing, and payment‑related processes */
  BILLING: "billing",

  /** Address used for shipping and delivery of physical goods */
  SHIPPING: "shipping",

  /** Address that serves both billing and shipping purposes */
  BOTH: "both",
} as const;

/**
 * Union type of all valid address types.
 */
export type TAddressType = (typeof AddressType)[keyof typeof AddressType];
