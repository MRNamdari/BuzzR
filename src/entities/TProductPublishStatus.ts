/**
 * Represents the publication state of a product.
 * Used to control visibility, workflow steps, and editorial actions.
 */
export const ProductPublishStatus = {
  /** Product is being created or edited and is not visible to customers */
  DRAFT: "draft",

  /** Product is finalized and publicly visible in the storefront */
  PUBLISHED: "published",
} as const;

/**
 * Union type of all possible product publication status values.
 */
export type TProductPublishStatus =
  (typeof ProductPublishStatus)[keyof typeof ProductPublishStatus];
