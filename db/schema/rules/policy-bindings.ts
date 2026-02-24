import { index, pgTable, unique } from "drizzle-orm/pg-core";
import { abacActions } from "./abac-actions";
import { abacResources } from "./abac-resources";
import { policies } from "./policies";

export const policyBindings = pgTable(
  "policy_bindings",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    policyId: t
      .bigint("policy_id", { mode: "number" })
      .references(() => policies.id, { onDelete: "cascade" })
      .notNull(),
    resourceId: t
      .bigint("resource_id", { mode: "number" })
      .references(() => abacResources.id, { onDelete: "cascade" })
      .notNull(),
    actionId: t
      .bigint("action_id", { mode: "number" })
      .references(() => abacActions.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_policy_bindings_action").using(
      "btree",
      table.actionId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_policy_bindings_policy").using(
      "btree",
      table.policyId.asc().nullsLast().op("int8_ops"),
    ),
    index("idx_policy_bindings_resource").using(
      "btree",
      table.resourceId.asc().nullsLast().op("int8_ops"),
    ),
    unique("policy_bindings_policy_id_resource_id_action_id_key").on(
      table.actionId,
      table.policyId,
      table.resourceId,
    ),
  ],
);
