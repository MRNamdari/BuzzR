import { defineEntity, p } from "@mikro-orm/core";
import { Media } from "./Media";
import { Languages } from "./Languages";

const MediaTranslationsSchema = defineEntity({
  name: "media_translations",
  uniques: [
    {
      name: "media_translations_media_id_lang_key",
      properties: ["lang", "media"],
    },
  ],
  properties: {
    id: p.bigint().primary(),
    media: () =>
      p.manyToOne(Media).ref().updateRule("no action").deleteRule("cascade"),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    altText: p.text().nullable(),
    caption: p.text().nullable(),
  },
});

export class MediaTranslations extends MediaTranslationsSchema.class {}

MediaTranslationsSchema.setClass(MediaTranslations);
