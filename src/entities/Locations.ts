import { defineEntity, p } from "@mikro-orm/core";
import { UserAddresses } from "./UserAddresses";

const LocationsSchema = defineEntity({
  name: "locations",
  properties: {
    id: p.bigint().primary(),
    countryCode: p.string().length(2),
    name: p.string().length(100),
    province: () =>
      p.manyToOne(Locations).ref().updateRule("no action").nullable(),
    locationsCollection: () => p.oneToMany(Locations).mappedBy("province"),
    userAddressesCollection: () =>
      p.oneToMany(UserAddresses).mappedBy("township"),
  },
});

export class Locations extends LocationsSchema.class {}

LocationsSchema.setClass(Locations);
