import { defineEntity, p } from "@mikro-orm/core";
import { PlatformIntegrations } from "./PlatformIntegrations";
import { LogLevel } from "./TLogLevel";
import { BaseEntity } from "./Base";

const IntegrationLogsSchema = defineEntity({
  name: "integration_logs",
  extends: BaseEntity,
  properties: {
    integration: () =>
      p
        .manyToOne(PlatformIntegrations)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade"),
    level: p
      .enum(() => LogLevel)
      .nativeEnumName("log_level")
      .default(LogLevel.INFO),
    message: p.text(),
    details: p.json<Record<string, any>>().nullable(),
  },
});

export class IntegrationLogs extends IntegrationLogsSchema.class {}

IntegrationLogsSchema.setClass(IntegrationLogs);
