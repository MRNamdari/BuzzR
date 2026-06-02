import { defineEntity, p } from "@mikro-orm/core";
import { GiftCards } from "./GiftCards";
import { Orders } from "./Orders";
import { BaseEntity } from "./Base";
import { GiftCardTransactionType } from "./TGiftCardTransactionType";

const GiftCardTransactionsSchema = defineEntity({
  name: "gift_card_transactions",
  extends: BaseEntity,
  properties: {
    giftCard: () =>
      p
        .manyToOne(GiftCards)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_gct_gift_card_id"),
    type: p
      .enum(() => GiftCardTransactionType)
      .nativeEnumName("gift_card_transaction_type")
      .default(GiftCardTransactionType.ISSUE),
    order: () => p.manyToOne(Orders).ref().updateRule("no action").nullable(),
    amount: p.decimal(),
  },
});

export class GiftCardTransactions extends GiftCardTransactionsSchema.class {}

GiftCardTransactionsSchema.setClass(GiftCardTransactions);
