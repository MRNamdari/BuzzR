import { defineEntity, p } from "@mikro-orm/core";
import { Media } from "./Media";
import { BaseEntity } from "./Base";

const MediaTagsSchema = defineEntity({
  name: "media_tags",
  extends: BaseEntity,
  uniques: [
    {
      name: "media_tags_media_id_tag_value_key",
      properties: ["media", "tag", "value"],
    },
  ],
  properties: {
    media: () =>
      p
        .manyToOne(Media)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_media_tags_media_id"),
    tag: p.string().length(100),
    value: p.string(),
  },
});

export class MediaTags extends MediaTagsSchema.class {}

MediaTagsSchema.setClass(MediaTags);
