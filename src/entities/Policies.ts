import { defineEntity, p } from "@mikro-orm/core";
import { Campaigns } from "./Campaigns";
import { PolicyBindings } from "./PolicyBindings";
import { PolicyEffect } from "./TPolicyEffect";
import { BaseEntity } from "./Base";

const PoliciesSchema = defineEntity({
  name: "policies",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_policies_active_time",
      properties: ["isActive", "validFrom", "validTo"],
    },
    {
      name: "idx_policies_condition_json_gin",
      properties: ["conditionJson"],
      type: "gin",
    },
    {
      name: "idx_policies_payload_json_gin",
      properties: ["payloadJson"],
      type: "gin",
    },
  ],
  checks: [{ expression: (cols) => `${cols.validTo} >= ${cols.validFrom}` }],
  properties: {
    name: p.string().length(150),
    type: p.string().length(50).index("idx_policies_type"),
    effect: p.enum(() => PolicyEffect).nativeEnumName("policy_effect"),
    priority: p.integer(),
    isActive: p.boolean(),
    conditionJson: p.json(),
    payloadJson: p.json().nullable(),
    validFrom: p.datetime().nullable(),
    validTo: p.datetime().nullable(),
    campaign: () =>
      p.manyToOne(Campaigns).ref().updateRule("no action").nullable(),
    appliesToSubject: p.json().nullable(),
    appliesToResource: p.json().nullable(),
    appliesToContext: p.json().nullable(),
    policyBindingsCollection: () =>
      p.oneToMany(PolicyBindings).mappedBy("policy"),
  },
});

export class Policies extends PoliciesSchema.class {}

PoliciesSchema.setClass(Policies);
