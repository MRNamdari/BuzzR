import { defineEntity, p } from "@mikro-orm/core";
import { PlatformIntegrations } from "./PlatformIntegrations";
import { BaseEntity } from "./Base";

const IntegrationSecretsSchema = defineEntity({
  name: "integration_secrets",
  extends: BaseEntity,
  properties: {
    integration: () =>
      p
        .manyToOne(PlatformIntegrations)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    key: p.string(),
    value: p.text(),
  },
});

export class IntegrationSecrets extends IntegrationSecretsSchema.class {}

IntegrationSecretsSchema.setClass(IntegrationSecrets);
