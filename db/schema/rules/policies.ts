import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { campaigns } from "../marketing/campaigns";

export const policies = pgTable(
  "policies",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: t.varchar({ length: 150 }).notNull(),
    type: t.varchar({ length: 50 }).notNull(),
    effect: t.varchar({ length: 20 }).notNull(),
    priority: t.integer().default(0).notNull(),
    isActive: t.boolean("is_active").default(true).notNull(),
    conditionJson: t.jsonb("condition_json").notNull(),
    payloadJson: t.jsonb("payload_json"),
    validFrom: t.timestamp("valid_from", {
      withTimezone: true,
      mode: "string",
    }),
    validTo: t.timestamp("valid_to", { withTimezone: true, mode: "string" }),
    campaignId: t.bigint("campaign_id", { mode: "number" }),
    appliesToSubject: t.jsonb("applies_to_subject"),
    appliesToResource: t.jsonb("applies_to_resource"),
    appliesToContext: t.jsonb("applies_to_context"),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_policies_active_time").on(
      table.isActive,
      table.validFrom,
      table.validTo,
    ),
    index("idx_policies_condition_json_gin").using(
      "gin",
      table.conditionJson.asc().nullsLast().op("jsonb_ops"),
    ),
    index("idx_policies_payload_json_gin").using(
      "gin",
      table.payloadJson.asc().nullsLast().op("jsonb_ops"),
    ),
    index("idx_policies_type").using(
      "btree",
      table.type.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.campaignId],
      foreignColumns: [campaigns.id],
      name: "fk_policies_campaign",
    }).onDelete("set null"),
  ],
);
