import { defineEntity, p } from "@mikro-orm/core";

const Base = defineEntity({
  name: "BaseEntity",
  abstract: true,
  properties: {
    id: p.bigint().primary(),
    createdAt: p.datetime().defaultRaw(`now()`),
    updatedAt: p
      .datetime()
      .defaultRaw(`now()`)
      .onUpdate(() => new Date()),
  },
});

export class BaseEntity extends Base.class {}

Base.setClass(BaseEntity);
