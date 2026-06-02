import { defineEntity, p } from "@mikro-orm/core";
import { PlatformIntegrations } from "./PlatformIntegrations";
import { BaseEntity } from "./Base";

const IntegrationWebhookEventsSchema = defineEntity({
  name: "integration_webhook_events",
  extends: BaseEntity,
  properties: {
    integration: () =>
      p
        .manyToOne(PlatformIntegrations)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    eventType: p.string(),
    payload: p.json(),
    recievedAt: p.datetime().defaultRaw(`now()`),
    proccessedAt: p.datetime().nullable(),
    error: p.string(),
  },
});

export class IntegrationWebhookEvents
  extends IntegrationWebhookEventsSchema.class {}

IntegrationWebhookEventsSchema.setClass(IntegrationWebhookEvents);
