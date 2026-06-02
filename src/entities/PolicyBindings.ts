import { defineEntity, p } from "@mikro-orm/core";
import { AbacActions } from "./AbacActions";
import { AbacResources } from "./AbacResources";
import { Policies } from "./Policies";
import { BaseEntity } from "./Base";

const PolicyBindingsSchema = defineEntity({
  name: "policy_bindings",
  extends: BaseEntity,
  uniques: [
    {
      name: "policy_bindings_policy_id_resource_id_action_id_key",
      properties: ["action", "policy", "resource"],
    },
  ],
  properties: {
    policy: () =>
      p
        .manyToOne(Policies)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_policy_bindings_policy"),
    resource: () =>
      p
        .manyToOne(AbacResources)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_policy_bindings_resource"),
    action: () =>
      p
        .manyToOne(AbacActions)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_policy_bindings_action"),
  },
});

export class PolicyBindings extends PolicyBindingsSchema.class {}

PolicyBindingsSchema.setClass(PolicyBindings);
