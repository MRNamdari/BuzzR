/**
 * Represents supported currency codes used across pricing, payments,
 * reporting, and internationalization.
 */
export const Currency = {
  /** Iranian Rial */
  IRR: "IRR",

  /** US Dollar */
  USD: "USD",

  /** Euro */
  EUR: "EUR",

  /** British Pound Sterling */
  GBP: "GBP",

  /** Canadian Dollar */
  CAD: "CAD",

  /** Australian Dollar */
  AUD: "AUD",

  /** UAE Dirham */
  DHS: "DHS",

  /** Japanese Yen */
  JPY: "JPY",

  /** Chinese Yuan */
  CNY: "CNY",

  /** Indian Rupee */
  INR: "INR",

  /** Turkish Lira */
  TRY: "TRY",

  /** Russian Ruble */
  RUB: "RUB",

  /** Afghan Afghani */
  AFN: "AFN",

  /** Pakistani Rupee */
  PKR: "PKR",

  /** Uzbekistani Som */
  UZS: "UZS",

  /** Azerbaijani Manat */
  AZN: "AZN",

  /** Turkmenistan Manat */
  TMT: "TMT",

  /** Georgian Lari */
  GEL: "GEL",

  /** Kazakhstani Tenge */
  KZT: "KZT",

  /** Tajikistani Somoni */
  TJS: "TJS",

  /** Yemeni Rial */
  YER: "YER",

  /** Lebanese Pound */
  LBP: "LBP",

  /** Syrian Pound */
  SYP: "SYP",

  /** Iraqi Dinar */
  IQD: "IQD",

  /** Qatari Riyal */
  QAR: "QAR",

  /** Bahraini Dinar */
  BHD: "BHD",

  /** Omani Rial */
  OMR: "OMR",

  /** Kuwaiti Dinar */
  KWD: "KWD",

  /** Saudi Riyal */
  SAR: "SAR",
} as const;

/**
 * Union type of all supported currency codes.
 */
export type TCurrency = (typeof Currency)[keyof typeof Currency];
