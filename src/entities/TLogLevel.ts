/**
 * Represents the severity level of a log entry.
 * Used to categorize system events and control log filtering.
 */
export const LogLevel = {
  /** General operational messages useful for tracing application flow */
  INFO: "info",

  /** Non‑critical issues that may require attention */
  WARN: "warn",

  /** Errors indicating failures or unexpected conditions */
  ERROR: "error",
} as const;

/**
 * Union type of all valid log levels.
 */
export type TLogLevel = (typeof LogLevel)[keyof typeof LogLevel];
