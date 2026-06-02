import { defineEntity, p } from "@mikro-orm/core";
import { UserTierAssignments } from "./UserTierAssignments";
import { BaseEntity } from "./Base";

const UserTiersSchema = defineEntity({
  name: "user_tiers",
  extends: BaseEntity,
  properties: {
    code: p.string().length(50).unique("user_tiers_code_key"),
    priority: p.integer().index("idx_user_tiers_priority"),
    userTierAssignmentsCollection: () =>
      p.oneToMany(UserTierAssignments).mappedBy("tier"),
  },
});

export class UserTiers extends UserTiersSchema.class {}

UserTiersSchema.setClass(UserTiers);
