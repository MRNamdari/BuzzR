import { defineEntity, p } from "@mikro-orm/core";
import { Media } from "./Media";
import { MediaSets } from "./MediaSets";
import { BaseEntity } from "./Base";

const MediaSetItemsSchema = defineEntity({
  name: "media_set_items",
  extends: BaseEntity,
  uniques: [
    {
      name: "media_set_items_media_set_id_media_id_key",
      properties: ["media", "mediaSet"],
    },
  ],
  properties: {
    mediaSet: () =>
      p
        .manyToOne(MediaSets)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    media: () =>
      p.manyToOne(Media).ref().updateRule("no action").deleteRule("cascade"),
    position: p.integer(),
  },
});

export class MediaSetItems extends MediaSetItemsSchema.class {}

MediaSetItemsSchema.setClass(MediaSetItems);
