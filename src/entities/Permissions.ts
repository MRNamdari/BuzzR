import { defineEntity, p } from "@mikro-orm/core";
import { Roles } from "./Roles";
import { BaseEntity } from "./Base";

const PermissionsSchema = defineEntity({
  name: "permissions",
  extends: BaseEntity,
  properties: {
    name: p.string().length(100).unique("permissions_name_key"),
    description: p.text().nullable(),
    rolePermissionsInverse: () =>
      p.manyToMany(Roles).mappedBy("rolePermissions"),
  },
});

export class Permissions extends PermissionsSchema.class {}

PermissionsSchema.setClass(Permissions);
