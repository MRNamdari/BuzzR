import { defineEntity, p } from "@mikro-orm/core";
import { Media } from "./Media";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const MediaVersionsSchema = defineEntity({
  name: "media_versions",
  extends: BaseEntity,
  uniques: [
    {
      name: "media_versions_media_id_version_number_key",
      properties: ["media", "versionNumber"],
    },
  ],
  properties: {
    media: () =>
      p.manyToOne(Media).ref().updateRule("no action").deleteRule("cascade"),
    versionNumber: p.integer(),
    dataSnapshot: p.json(),
    createdBy: () =>
      p
        .manyToOne(Users)
        .ref()
        .name("created_by")
        .updateRule("no action")
        .nullable(),
  },
});

export class MediaVersions extends MediaVersionsSchema.class {}

MediaVersionsSchema.setClass(MediaVersions);
