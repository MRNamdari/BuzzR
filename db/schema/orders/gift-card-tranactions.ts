import { foreignKey, index, pgTable } from "drizzle-orm/pg-core";
import { giftCards } from "./gift-cards";
import { orders } from "./orders";

export const giftCardTransactions = pgTable(
  "gift_card_transactions",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    giftCardId: t.bigint("gift_card_id", { mode: "number" }).notNull(),
    type: t.varchar({ length: 20 }).notNull(),
    orderId: t.bigint("order_id", { mode: "number" }),
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_gct_gift_card_id").using(
      "btree",
      table.giftCardId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.giftCardId],
      foreignColumns: [giftCards.id],
      name: "fk_gift_card_id",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "fk_gift_card_order_id",
    }).onDelete("set null"),
  ],
);
