/**
 * Represents the external platforms that the system can integrate with.
 * Used to determine connector behavior, API routing, and feature availability.
 */
export const SupportedPlatform = {
  /** Shopify e‑commerce platform integration */
  SHOPIFY: "shopify",

  /** Telegram messaging platform integration */
  TELEGRAM: "telegram",

  /** Google Ads advertising platform integration */
  GOOGLE_ADS: "google_ads",

  /** Facebook social and advertising platform integration */
  FACEBOOK: "facebook",
} as const;

/**
 * Union type of all supported platform identifiers.
 */
export type TSupportedPlatform =
  (typeof SupportedPlatform)[keyof typeof SupportedPlatform];
