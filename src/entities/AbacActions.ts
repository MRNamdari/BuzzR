import { defineEntity, p } from "@mikro-orm/core";
import { PolicyBindings } from "./PolicyBindings";
import { BaseEntity } from "./Base";

const AbacActionsSchema = defineEntity({
  name: "abac_actions",
  extends: BaseEntity,
  properties: {
    code: p
      .string()
      .length(100)
      .index("idx_abac_actions_code")
      .unique("abac_actions_code_key"),
    description: p.text().nullable(),
    policyBindingsCollection: () =>
      p.oneToMany(PolicyBindings).mappedBy("action"),
  },
});

export class AbacActions extends AbacActionsSchema.class {}

AbacActionsSchema.setClass(AbacActions);
