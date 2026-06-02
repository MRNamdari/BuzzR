import { defineEntity, p } from "@mikro-orm/core";
import { Permissions } from "./Permissions";
import { RolesTranslations } from "./RolesTranslations";
import { Users } from "./Users";

const RolesSchema = defineEntity({
  name: "roles",
  properties: {
    id: p.bigint().primary(),
    rolePermissions: () =>
      p
        .manyToMany(Permissions)
        .pivotTable("role_permissions")
        .joinColumn("role_id")
        .inverseJoinColumn("permission_id"),
    rolesTranslationsCollection: () =>
      p.oneToMany(RolesTranslations).mappedBy("role"),
    userRolesInverse: () => p.manyToMany(Users).mappedBy("userRoles"),
  },
});

export class Roles extends RolesSchema.class {}

RolesSchema.setClass(Roles);
