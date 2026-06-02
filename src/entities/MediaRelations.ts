import { defineEntity, p } from "@mikro-orm/core";
import { Media } from "./Media";
import { EntityType } from "./TEntityType";
import { BaseEntity } from "./Base";

const MediaRelationsSchema = defineEntity({
  name: "media_relations",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_media_relations_entity",
      expression: (cols, table, indexName) =>
        `CREATE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.entityType}, ${cols.entityId})`,
      properties: ["entityType", "entityId"],
    },
  ],
  properties: {
    media: () =>
      p
        .manyToOne(Media)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_media_relations_media_id"),
    entityType: p
      .enum(() => EntityType)
      .name("entityType")
      .nativeEnumName("entity_type"),
    entityId: p.bigint(),
    role: p.string().length(50),
    position: p.integer(),
    metadata: p.json().nullable(),
  },
});

export class MediaRelations extends MediaRelationsSchema.class {}

MediaRelationsSchema.setClass(MediaRelations);
