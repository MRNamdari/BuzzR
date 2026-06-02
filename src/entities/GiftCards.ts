import { defineEntity, p } from "@mikro-orm/core";
import { GiftCardTransactions } from "./GiftCardTransactions";
import { BaseEntity } from "./Base";
import { Currency } from "./TCurrency";

const GiftCardsSchema = defineEntity({
  name: "gift_cards",
  extends: BaseEntity,
  properties: {
    code: p.string().length(100).unique("gift_cards_code_key"),
    initialBalance: p.decimal(),
    currentBalance: p.decimal(),
    currency: p.enum(() => Currency).nativeEnumName("currency"),
    expiresAt: p.datetime().nullable().index("idx_gift_cards_expires_at"),
    status: p.string().length(20).index("idx_gift_cards_status"),
    giftCardTransactionsCollection: () =>
      p.oneToMany(GiftCardTransactions).mappedBy("giftCard"),
  },
});

export class GiftCards extends GiftCardsSchema.class {}

GiftCardsSchema.setClass(GiftCards);
