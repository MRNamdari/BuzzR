import { defineEntity, p } from "@mikro-orm/core";
import { Orders } from "./Orders";
import { Refunds } from "./Refunds";
import { BaseEntity } from "./Base";
import { Currency } from "./TCurrency";
import { PaymentStatus } from "./TPaymentStatus";

const PaymentsSchema = defineEntity({
  name: "payments",
  extends: BaseEntity,
  properties: {
    order: () =>
      p
        .manyToOne(Orders)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_payments_order_id"),
    provider: p.string().length(50),
    amount: p.decimal(),
    currency: p.enum(() => Currency).nativeEnumName("currency"),
    status: p
      .enum(() => PaymentStatus)
      .nativeEnumName("payment_status")
      .index("idx_payments_status"),
    externalReference: p.string().nullable(),
    refundsCollection: () => p.oneToMany(Refunds).mappedBy("payment"),
  },
});

export class Payments extends PaymentsSchema.class {}

PaymentsSchema.setClass(Payments);
