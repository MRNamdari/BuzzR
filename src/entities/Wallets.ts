import { defineEntity, p } from "@mikro-orm/core";
import { Currency } from "./TCurrency";
import { Users } from "./Users";
import { WalletLedger } from "./WalletLedger";
import { BaseEntity } from "./Base";

const WalletsSchema = defineEntity({
  name: "wallets",
  extends: BaseEntity,
  uniques: [
    { name: "wallets_user_id_currency_key", properties: ["currency", "user"] },
  ],
  properties: {
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_wallets_user_id"),
    currency: p.enum(() => Currency).nativeEnumName("currency"),
    currentBalance: p.decimal(),
    walletLedgerCollection: () => p.oneToMany(WalletLedger).mappedBy("wallet"),
  },
});

export class Wallets extends WalletsSchema.class {}

WalletsSchema.setClass(Wallets);
