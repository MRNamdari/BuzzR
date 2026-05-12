import { sql } from "drizzle-orm";
import { check, index, pgTable } from "drizzle-orm/pg-core";
import { wallets } from "./wallets";
import { WalletLedgerSourceTypeEnum, WalletLedgerTypeEnum } from "../enums";

export const walletLedger = pgTable(
  "wallet_ledger",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    walletId: t
      .bigint("wallet_id", { mode: "number" })
      .references(() => wallets.id, { onDelete: "cascade" })
      .notNull(),
    type: WalletLedgerTypeEnum("type").notNull(),
    sourceType: WalletLedgerSourceTypeEnum("source_type").notNull(),
    sourceId: t.bigint("source_id", { mode: "number" }), // Reference to Order/ GiftCard/ Refund/ User.
    amount: t.numeric({ precision: 10, scale: 2 }).notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("idx_wallet_ledger_source").on(table.sourceType, table.sourceId),
    index("idx_wallet_ledger_wallet_id").using(
      "btree",
      table.walletId.asc().nullsLast().op("int8_ops"),
    ),
    // check(
    //   "chk_wallet_ledger_type",
    //   sql`(type)::text = ANY ((ARRAY['credit'::character varying, 'debit'::character varying, 'adjustment'::character varying])::text[])`,
    // ),
    // check(
    //   "chk_wallet_ledger_source_type",
    //   sql`(source_type)::text = ANY ((ARRAY['order'::character varying, 'refund'::character varying, 'gift_card'::character varying, 'manual'::character varying])::text[])`,
    // ),
  ],
);
