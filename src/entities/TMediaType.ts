/**
 * Represents the type of media associated with an asset.
 * Used to determine rendering behavior, storage rules, and processing pipelines.
 */
export const MediaType = {
  /** A static visual asset such as PNG, JPG, or WebP */
  IMAGE: "image",

  /** A motion asset such as MP4, WebM, or similar video formats */
  VIDEO: "video",

  /** A 3D model or interactive asset (e.g., GLB, GLTF) */
  "3D": "3d",
} as const;

/**
 * Union type of all valid media types.
 */
export type TMediaType = (typeof MediaType)[keyof typeof MediaType];
