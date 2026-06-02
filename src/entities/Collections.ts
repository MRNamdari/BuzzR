import { defineEntity, p } from "@mikro-orm/core";
import { CollectionProducts } from "./CollectionProducts";
import { CollectionTranslations } from "./CollectionTranslations";
import { BaseEntity } from "./Base";

const CollectionsSchema = defineEntity({
  name: "collections",
  extends: BaseEntity,
  properties: {
    slug: p.string().unique("collections_slug_key"),
    deletedAt: p.datetime().nullable(),
    collectionProductsCollection: () =>
      p.oneToMany(CollectionProducts).mappedBy("collection"),
    collectionTranslationsCollection: () =>
      p.oneToMany(CollectionTranslations).mappedBy("collection"),
  },
});

export class Collections extends CollectionsSchema.class {}

CollectionsSchema.setClass(Collections);
