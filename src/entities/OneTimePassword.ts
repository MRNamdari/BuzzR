import { defineEntity, p } from "@mikro-orm/core";
import { Users } from "./Users";
import { PlatformIntegrations } from "./PlatformIntegrations";

const OneTimePasswordSchema = defineEntity({
  name: "one_time_password",
  properties: {
    id: p.bigint().primary(),
    user: () =>
      p.manyToOne(Users).ref().updateRule("no action").deleteRule("cascade"),
    code: p.string(),
    platform: () =>
      p
        .manyToOne(PlatformIntegrations)
        .ref()
        .updateRule("no action")
        .deleteRule("no action"),
    createdAt: p
      .datetime()
      .defaultRaw("now()")
      .index("idx_one_time_password_created_at"),
    usedAt: p.datetime().nullable(),
  },
});

export class OneTimePassword extends OneTimePasswordSchema.class {}

OneTimePasswordSchema.setClass(OneTimePassword);
