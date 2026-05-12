import { index, pgTable } from "drizzle-orm/pg-core";
import { campaigns } from "../marketing/campaigns";
import { PolicyEffectEnum } from "../enums";

export const policies = pgTable(
  "policies",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: t.varchar({ length: 150 }).notNull(),
    type: t.varchar({ length: 50 }).notNull(),
    effect: PolicyEffectEnum("effect").default("allow").notNull(),
    priority: t.integer().default(0).notNull(),
    isActive: t.boolean("is_active").default(true).notNull(),
    conditionJson: t.jsonb("condition_json").notNull(),
    payloadJson: t.jsonb("payload_json"), // stores what it needs to happen to the payload/values
    validFrom: t.timestamp("valid_from", {
      withTimezone: true,
      mode: "string",
    }),
    validTo: t.timestamp("valid_to", { withTimezone: true, mode: "string" }),
    campaignId: t
      .bigint("campaign_id", { mode: "number" })
      .references(() => campaigns.id, { onDelete: "set null" }),
    appliesToSubject: t.jsonb("applies_to_subject"), // determines who these rules applies on
    appliesToResource: t.jsonb("applies_to_resource"), // detemines what these rules applies on
    appliesToContext: t.jsonb("applies_to_context"), // determines what environment rules must be
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
  ],
);
