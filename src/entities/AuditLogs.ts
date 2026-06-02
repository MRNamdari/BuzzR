import { defineEntity, p } from "@mikro-orm/core";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const AuditLogsSchema = defineEntity({
  name: "audit_logs",
  indexes: [
    { name: "idx_audit_logs_entity", properties: ["entityType", "entityId"] },
  ],
  extends: BaseEntity,
  properties: {
    actorUser: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_audit_logs_actor"),
    entityType: p.string().length(50),
    entityId: p.bigint().nullable(),
    action: p.string().length(50),
    metadata: p.json().nullable(),
  },
});

export class AuditLogs extends AuditLogsSchema.class {}

AuditLogsSchema.setClass(AuditLogs);
