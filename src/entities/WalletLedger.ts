import { defineEntity, p } from "@mikro-orm/core";
import { WalletLedgerSourceType } from "./TWalletLedgerSourceType";
import { WalletLedgerType } from "./TWalletLedgerType";
import { Wallets } from "./Wallets";
import { BaseEntity } from "./Base";

const WalletLedgerSchema = defineEntity({
  name: "wallet_ledger",
  extends: BaseEntity,
  indexes: [
    {
      name: "idx_wallet_ledger_source",
      properties: ["sourceType", "sourceId"],
    },
  ],
  properties: {
    wallet: () =>
      p
        .manyToOne(Wallets)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_wallet_ledger_wallet_id"),
    type: p.enum(() => WalletLedgerType).nativeEnumName("wallet_ledger_type"),
    sourceType: p
      .enum(() => WalletLedgerSourceType)
      .nativeEnumName("wallet_ledger_source_type"),
    sourceId: p.bigint().nullable(),
    amount: p.decimal(),
  },
});

export class WalletLedger extends WalletLedgerSchema.class {}

WalletLedgerSchema.setClass(WalletLedger);
