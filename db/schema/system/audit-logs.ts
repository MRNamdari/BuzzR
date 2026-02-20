import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { users } from "../customers/users";

export const auditLogs = pgTable(
  "audit_logs",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    actorUserId: t.bigint("actor_user_id", { mode: "number" }),
    entityType: t.varchar("entity_type", { length: 50 }).notNull(),
    entityId: t.bigint("entity_id", { mode: "number" }),
    action: t.varchar({ length: 50 }).notNull(),
    metadata: t.jsonb("metadata"),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_audit_logs_actor").using(
      "btree",
      table.actorUserId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_audit_logs_entity").on(table.entityType, table.entityId),
    foreignKey({
      columns: [table.actorUserId],
      foreignColumns: [users.id],
      name: "fk_audit_logs_actor",
    }).onDelete("set null"),
  ],
);
