import { defineEntity, p } from "@mikro-orm/core";
import { CategoryTranslations } from "./CategoryTranslations";
import { Products } from "./Products";
import { BaseEntity } from "./Base";

const CategoriesSchema = defineEntity({
  name: "categories",
  extends: BaseEntity,
  properties: {
    parent: () =>
      p
        .manyToOne(Categories)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_categories_parent_id"),
    deletedAt: p.datetime().nullable(),
    categoriesCollection: () => p.oneToMany(Categories).mappedBy("parent"),
    categoryTranslationsCollection: () =>
      p.oneToMany(CategoryTranslations).mappedBy("category"),
    productsCollection: () => p.oneToMany(Products).mappedBy("category"),
  },
});

export class Categories extends CategoriesSchema.class {}

CategoriesSchema.setClass(Categories);
