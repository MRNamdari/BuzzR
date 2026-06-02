import { defineEntity, p } from "@mikro-orm/core";
import { MediaSetItems } from "./MediaSetItems";
import { BaseEntity } from "./Base";

const MediaSetsSchema = defineEntity({
  name: "media_sets",
  extends: BaseEntity,
  properties: {
    name: p.string(),
    description: p.text().nullable(),
    mediaSetItemsCollection: () =>
      p.oneToMany(MediaSetItems).mappedBy("mediaSet"),
  },
});

export class MediaSets extends MediaSetsSchema.class {}

MediaSetsSchema.setClass(MediaSets);
