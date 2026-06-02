import { defineEntity, p } from "@mikro-orm/core";
import { PolicyBindings } from "./PolicyBindings";
import { BaseEntity } from "./Base";

const AbacResourcesSchema = defineEntity({
  name: "abac_resources",
  extends: BaseEntity,
  properties: {
    code: p
      .string()
      .length(100)
      .index("idx_abac_resources_code")
      .unique("abac_resources_code_key"),
    description: p.text().nullable(),
    policyBindingsCollection: () =>
      p.oneToMany(PolicyBindings).mappedBy("resource"),
  },
});

export class AbacResources extends AbacResourcesSchema.class {}

AbacResourcesSchema.setClass(AbacResources);
