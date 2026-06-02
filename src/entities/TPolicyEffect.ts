/**
 * Represents the outcome of a policy evaluation.
 * Determines whether an action is permitted or explicitly blocked.
 */
export const PolicyEffect = {
  /** The action is permitted according to the policy */
  ALLOW: "allow",

  /** The action is explicitly denied by the policy */
  DENY: "deny",
} as const;

/**
 * Union type of all valid policy effects.
 */
export type TPolicyEffect = (typeof PolicyEffect)[keyof typeof PolicyEffect];
