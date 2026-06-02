/**
 * Represents the current connection state of an external integration.
 * Used to determine UI behavior, sync flows, and error handling logic.
 */
export const IntegrationStatus = {
  /** The integration is not connected and no active session exists */
  DISCONNECTED: "disconnected",

  /** The system is in the process of establishing a connection */
  CONNECTING: "connecting",

  /** The integration is successfully connected and operational */
  CONNECTED: "connected",

  /** The integration encountered an error and may require user action */
  ERROR: "error",
} as const;

/**
 * Union type of all valid integration status values.
 */
export type TIntegrationStatus =
  (typeof IntegrationStatus)[keyof typeof IntegrationStatus];
