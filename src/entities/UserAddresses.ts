import { defineEntity, p } from "@mikro-orm/core";
import { Locations } from "./Locations";
import { Orders } from "./Orders";
import { AddressType } from "./TAddressType";
import { Users } from "./Users";
import { BaseEntity } from "./Base";

const UserAddressesSchema = defineEntity({
  name: "user_addresses",
  extends: BaseEntity,
  properties: {
    user: () =>
      p
        .manyToOne(Users)
        .ref()
        .updateRule("no action")
        .deleteRule("cascade")
        .index("idx_user_addresses_user_id"),
    type: p
      .enum(() => AddressType)
      .nativeEnumName("address_type")
      .index("idx_user_addresses_type"),
    isDefault: p.boolean(),
    fullName: p.string().length(200).nullable(),
    province: p.string().nullable(),
    township: () =>
      p
        .manyToOne(Locations)
        .ref()
        .name("township")
        .updateRule("no action")
        .deleteRule("set null"),
    zone: p.string().length(200).nullable(),
    village: p.string().nullable(),
    localityType: p.string().length(200),
    localityName: p.string(),
    sublocality: p.string().nullable(),
    street: p.string(),
    street2: p.string().nullable(),
    houseNo: p.decimal().name("houseNo"),
    floor: p.string().length(64).nullable(),
    sideFloor: p.string().length(64).nullable(),
    buildingName: p.text().name("buildingName").nullable(),
    description: p.text().nullable(),
    postCode: p.string().length(20),
    country: p.string().length(5),
    receiverName: p.string().length(100).nullable(),
    receiverPhone: p.string().length(15).nullable(),
    ordersCollection: () => p.oneToMany(Orders).mappedBy("billingAddress"),
    ordersCollection1: () => p.oneToMany(Orders).mappedBy("shippingAddress"),
  },
});

export class UserAddresses extends UserAddressesSchema.class {}

UserAddressesSchema.setClass(UserAddresses);
