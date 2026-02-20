import { foreignKey, index, pgTable, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

export const wallets = pgTable(
  "wallets",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    currency: t.varchar({ length: 3 }).notNull(),
    currentBalance: t
      .numeric("current_balance", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
  }),
  (table) => [
    index("idx_wallets_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_wallets_user",
    }).onDelete("cascade"),
    unique("wallets_user_id_currency_key").on(table.currency, table.userId),
  ],
);
