import { defineEntity, p } from "@mikro-orm/core";
import { Products } from "./Products";
import { Languages } from "./Languages";

const ProductTranslationsSchema = defineEntity({
  name: "product_translations",
  uniques: [
    {
      name: "product_translations_product_id_lang_key",
      properties: ["lang", "product"],
    },
  ],
  properties: {
    id: p.bigint().primary(),
    product: () =>
      p.manyToOne(Products).ref().updateRule("no action").deleteRule("cascade"),
    lang: () =>
      p
        .manyToOne(Languages)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    name: p.string(),
    description: p.text().nullable(),
    shortDescription: p.text().nullable(),
    metaTitle: p.string().nullable(),
    metaDescription: p.text().nullable(),
    metaKeywords: p.text().nullable(),
  },
});

export class ProductTranslations extends ProductTranslationsSchema.class {}

ProductTranslationsSchema.setClass(ProductTranslations);
