import { defineEntity, p } from "@mikro-orm/core";
import { UserTiers } from "./UserTiers";
import { Users } from "./Users";

const UserTierAssignmentsSchema = defineEntity({
  name: "user_tier_assignments",
  properties: {
    user: () => p.oneToOne(Users).primary().ref().updateRule("no action"),
    tier: () =>
      p
        .manyToOne(UserTiers)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_user_tier_assignments_tier_id"),
    assignedAt: p.datetime().defaultRaw(`now()`),
    expiresAt: p
      .datetime()
      .nullable()
      .index("idx_user_tier_assignments_expires_at"),
  },
});

export class UserTierAssignments extends UserTierAssignmentsSchema.class {}

UserTierAssignmentsSchema.setClass(UserTierAssignments);
