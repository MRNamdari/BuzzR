import { defineEntity, p } from "@mikro-orm/core";
import { Collections } from "./Collections";
import { Languages } from "./Languages";
import { BaseEntity } from "./Base";

const CollectionTranslationsSchema = defineEntity({
  name: "collection_translations",
  extends: BaseEntity,
  uniques: [
    {
      name: "collection_translations_collection_id_lang_key",
      properties: ["collection", "lang"],
    },
  ],
  properties: {
    collection: () =>
      p
        .manyToOne(Collections)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    name: p.string(),
    description: p.text().nullable(),
  },
});

export class CollectionTranslations
  extends CollectionTranslationsSchema.class {}

CollectionTranslationsSchema.setClass(CollectionTranslations);
