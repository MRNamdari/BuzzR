import { index, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";
import { userTiers } from "./user-tiers";

export const userTierAssignments = pgTable(
  "user_tier_assignments",
  (t) => ({
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .primaryKey()
      .notNull(),
    tierId: t
      .bigint("tier_id", { mode: "number" })
      .references(() => userTiers.id, { onDelete: "cascade" })
      .notNull(),
    assignedAt: t
      .timestamp("assigned_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    expiresAt: t.timestamp("expires_at", {
      withTimezone: true,
      mode: "string",
    }),
  }),
  (table) => [
    index("idx_user_tier_assignments_expires_at").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    index("idx_user_tier_assignments_tier_id").using(
      "btree",
      table.tierId.asc().nullsLast().op("int8_ops"),
    ),
  ],
);
