import {
  check,
  foreignKey,
  index,
  pgTable,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const userAttributes = pgTable(
  "user_attributes",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    key: t.varchar({ length: 100 }).notNull(),
    valueText: t.text("value_text"),
    valueNum: t.numeric("value_num", { precision: 20, scale: 4 }),
    valueBool: t.boolean("value_bool"),
    valueJson: t.jsonb("value_json"),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_user_attributes_key").using(
      "btree",
      table.key.asc().nullsLast().op("text_ops"),
    ),
    index("idx_user_attributes_key_bool")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueBool.asc().nullsLast().op("bool_ops"),
      )
      .where(sql`(value_bool IS NOT NULL)`),
    index("idx_user_attributes_key_num")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueNum.asc().nullsLast().op("numeric_ops"),
      )
      .where(sql`(value_num IS NOT NULL)`),
    index("idx_user_attributes_key_text")
      .using(
        "btree",
        table.key.asc().nullsLast().op("text_ops"),
        table.valueText.asc().nullsLast().op("text_ops"),
      )
      .where(sql`(value_text IS NOT NULL)`),
    uniqueIndex("uq_user_attributes_user_key").on(table.userId, table.key),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_user_attributes_user",
    }).onDelete("cascade"),
    check(
      "chk_user_attributes_value",
      sql`((value_text IS NOT NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NOT NULL) AND (value_bool IS NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NOT NULL) AND (value_json IS NULL)) OR ((value_text IS NULL) AND (value_num IS NULL) AND (value_bool IS NULL) AND (value_json IS NOT NULL))`,
    ),
  ],
);
