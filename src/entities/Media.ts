import { Collection, type Opt, defineEntity, p } from "@mikro-orm/core";
import { MediaRelations } from "./MediaRelations";
import { MediaSetItems } from "./MediaSetItems";
import { MediaTags } from "./MediaTags";
import { MediaTranslations } from "./MediaTranslations";
import { MediaVersions } from "./MediaVersions";
import { MediaType } from "./TMediaType";
import { BaseEntity } from "./Base";

const MediaSchema = defineEntity({
  name: "media",
  extends: BaseEntity,
  properties: {
    url: p.text(),
    type: p
      .enum(() => MediaType)
      .nativeEnumName("media_type")
      .index("idx_media_type"),
    mimeType: p.string().length(100).nullable(),
    fileSize: p.bigint().nullable(),
    width: p.integer().nullable(),
    height: p.integer().nullable(),
    duration: p.decimal().nullable(),
    checksum: p.string().nullable().index("idx_media_checksum"),
    metadata: p.json().nullable(),
    deletedAt: p.datetime().nullable().index("idx_media_deleted_at"),
    mediaRelationsCollection: () =>
      p.oneToMany(MediaRelations).mappedBy("media"),
    mediaSetItemsCollection: () => p.oneToMany(MediaSetItems).mappedBy("media"),
    mediaTagsCollection: () => p.oneToMany(MediaTags).mappedBy("media"),
    mediaTranslationsCollection: () =>
      p.oneToMany(MediaTranslations).mappedBy("media"),
    mediaVersionsCollection: () => p.oneToMany(MediaVersions).mappedBy("media"),
  },
});

export class Media extends MediaSchema.class {}

MediaSchema.setClass(Media);
