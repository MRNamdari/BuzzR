import { defineEntity, p } from "@mikro-orm/core";
import { GiftCardTransactions } from "./GiftCardTransactions";
import { OrderItems } from "./OrderItems";
import { Payments } from "./Payments";
import { PromotionUsage } from "./PromotionUsage";
import { Returns } from "./Returns";
import { Reviews } from "./Reviews";
import { Shipments } from "./Shipments";
import { UserAddresses } from "./UserAddresses";
import { Users } from "./Users";
import { Currency } from "./TCurrency";

const OrdersSchema = defineEntity({
  name: "orders",
  checks: [
    { expression: (cols) => `${cols.subtotalAmount} >= 0` },
    { expression: (cols) => `${cols.taxAmount} >= 0` },
    { expression: (cols) => `${cols.shippingAmount} >= 0` },
    { expression: (cols) => `${cols.discountAmount} >= 0` },
    { expression: (cols) => `${cols.totalAmount} >= 0` },
  ],
  properties: {
    id: p.bigint().primary(),
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .nullable()
        .index("idx_orders_user_id"),
    status: p.string().length(20).index("idx_orders_status"),
    currency: p.enum(() => Currency).nativeEnumName("currency"),
    subtotalAmount: p.decimal(),
    taxAmount: p.decimal(),
    shippingAmount: p.decimal(),
    discountAmount: p.decimal(),
    totalAmount: p.decimal(),
    billingAddress: () =>
      p.manyToOne(UserAddresses).ref().updateRule("no action").nullable(),
    shippingAddress: () =>
      p.manyToOne(UserAddresses).ref().updateRule("no action").nullable(),
    notes: p.string().length(2000).nullable(),
    createdAt: p.datetime().defaultRaw(`now()`).index("idx_orders_created_at"),
    updatedAt: p.datetime().defaultRaw(`now()`),
    giftCardTransactionsCollection: () =>
      p.oneToMany(GiftCardTransactions).mappedBy("order"),
    orderItemsCollection: () => p.oneToMany(OrderItems).mappedBy("order"),
    paymentsCollection: () => p.oneToMany(Payments).mappedBy("order"),
    promotionUsageCollection: () =>
      p.oneToMany(PromotionUsage).mappedBy("order"),
    returnsCollection: () => p.oneToMany(Returns).mappedBy("order"),
    reviewsCollection: () => p.oneToMany(Reviews).mappedBy("order"),
    shipmentsCollection: () => p.oneToMany(Shipments).mappedBy("order"),
  },
});

export class Orders extends OrdersSchema.class {}

OrdersSchema.setClass(Orders);
