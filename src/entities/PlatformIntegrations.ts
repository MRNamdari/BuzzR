import { defineEntity, p } from "@mikro-orm/core";
import { IntegrationStatus } from "./TIntegrationStatus";
import { SupportedPlatform } from "./TSupportedPlatform";
import { BaseEntity } from "./Base";

const PlatformIntegrationsSchema = defineEntity({
  name: "platform_integrations",
  extends: BaseEntity,
  properties: {
    platform: p
      .enum(() => SupportedPlatform)
      .nativeEnumName("integration_status")
      .index("idx_integration_status"),
    status: p
      .enum(() => IntegrationStatus)
      .nativeEnumName("integration_status")
      .default(IntegrationStatus.DISCONNECTED),
    config: p.json<Record<string, any>>().defaultRaw(`'{}'::jsonb`),
    lastSyncAt: p.datetime().nullable(),
  },
});

export class PlatformIntegrations extends PlatformIntegrationsSchema.class {}

PlatformIntegrationsSchema.setClass(PlatformIntegrations);
