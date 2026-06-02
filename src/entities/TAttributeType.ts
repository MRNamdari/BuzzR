/**
 * Represents the data type of an attribute.
 * Used to determine validation rules, input components, and storage format.
 */
export const AttributeType = {
  /** A free‑form text value (e.g., color name, material, label) */
  TEXT: "text",

  /** A numeric value (e.g., weight, length, capacity) */
  NUMBER: "number",

  /** A true/false value used for toggles or binary attributes */
  BOOLEAN: "boolean",
} as const;

/**
 * Union type of all valid attribute types.
 */
export type TAttributeType = (typeof AttributeType)[keyof typeof AttributeType];
