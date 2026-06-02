import { defineEntity, p } from "@mikro-orm/core";
import { EntityType } from "./TEntityType";
import { Languages } from "./Languages";

const SeoMetadataSchema = defineEntity({
  name: "seo_metadata",
  indexes: [
    {
      name: "idx_seo_metadata_entity",
      expression: (cols, table, indexName) =>
        `CREATE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.entityType}, ${cols.entityId})`,
      properties: ["entityType", "entityId"],
    },
  ],
  uniques: [
    {
      name: "seo_metadata_entity_type_entity_id_lang_key",
      expression: (cols, table, indexName) =>
        `CREATE UNIQUE INDEX ${indexName} ON ${table.schema}.${table.name} USING btree (${cols.entityId}, ${cols.entityType}, ${cols.lang})`,
      properties: ["entityId", "entityType", "lang"],
    },
  ],
  properties: {
    id: p.bigint().primary(),
    entityType: p.enum(() => EntityType).nativeEnumName("entity_type"),
    entityId: p.bigint(),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    metaTitle: p.string().nullable(),
    metaDescription: p.text().nullable(),
    metaKeywords: p.text().nullable(),
    ogTitle: p.string().nullable(),
    ogDescription: p.text().nullable(),
    ogImageUrl: p.text().nullable(),
  },
});

export class SeoMetadata extends SeoMetadataSchema.class {}

SeoMetadataSchema.setClass(SeoMetadata);
