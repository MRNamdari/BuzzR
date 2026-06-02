import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { Promotions } from "./Promotions";
import { Users } from "./Users";

const PromotionUsageSchema = defineEntity({
  name: "promotion_usage",
  properties: {
    id: p.bigint().primary(),
    promotion: () =>
      p
        .manyToOne(Promotions)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_promotion_usage_promotion"),
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_promotion_usage_user"),
    order: () => p.manyToOne(Orders).ref().updateRule("no action").nullable(),
    usedAt: p.datetime().defaultRaw(`now()`),
  },
});

export class PromotionUsage extends PromotionUsageSchema.class {}

PromotionUsageSchema.setClass(PromotionUsage);
