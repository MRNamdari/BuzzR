import { defineEntity, p } from "@mikro-orm/core";
import { Categories } from "./Categories";
import { Languages } from "./Languages";
import { BaseEntity } from "./Base";

const CategoryTranslationsSchema = defineEntity({
  name: "category_translations",
  extends: BaseEntity,
  uniques: [
    {
      name: "category_translations_category_id_lang_key",
      properties: ["category", "lang"],
    },
    {
      name: "category_translations_lang_slug_key",
      properties: ["lang", "slug"],
    },
  ],
  properties: {
    category: () =>
      p
        .manyToOne(Categories)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    name: p.string().length(100),
    slug: p.string().length(100),
    description: p.text().nullable(),
    metaTitle: p.string().nullable(),
    metaDescription: p.text().nullable(),
    metaKeywords: p.text().nullable(),
  },
});

export class CategoryTranslations extends CategoryTranslationsSchema.class {}

CategoryTranslationsSchema.setClass(CategoryTranslations);
