import { sql } from "drizzle-orm";
import { check, index, pgTable } from "drizzle-orm/pg-core";
import { locations } from "../logistics/locations";
import { users } from "./users";
import { AddressTypeEnum } from "../enums";

export const userAddresses = pgTable(
  "user_addresses",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: AddressTypeEnum("type").notNull().default("both"),
    isDefault: t.boolean("is_default").default(false).notNull(),
    fullName: t.varchar("full_name", { length: 200 }),
    province: t.varchar({ length: 255 }),
    township: t
      .bigint({ mode: "number" })
      .references(() => locations.id, { onDelete: "set null" })
      .notNull(),
    zone: t.varchar({ length: 200 }),
    village: t.varchar({ length: 255 }),
    localityType: t.varchar("locality_type", { length: 200 }).notNull(),
    localityName: t.varchar("locality_name", { length: 255 }).notNull(),
    subLocality: t.varchar("sublocality", { length: 255 }),
    street: t.varchar({ length: 255 }).notNull(),
    street2: t.varchar({ length: 255 }),
    houseNo: t.numeric({ mode: "number" }).notNull(),
    floor: t.varchar({ length: 64 }).default(""),
    sideFloor: t.varchar("side_floor", { length: 64 }).default(""),
    buildingName: t.text(),
    description: t.text(),
    postCode: t.varchar("post_code", { length: 20 }).notNull(),
    country: t.varchar({ length: 5 }).default("IR").notNull(),
    receiverName: t
      .varchar("receiver_name", { length: 100 })
      .default(sql`NULL`),
    receiverPhone: t
      .varchar("receiver_phone", { length: 15 })
      .default(sql`NULL`),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    // city: t
    //   .bigint({ mode: "number" })
    //   .references(() => locations.id, { onDelete: "set null" })
    //   .notNull(),
    // state: t
    //   .bigint({ mode: "number" })
    //   .references(() => locations.id, { onDelete: "set null" })
    //   .notNull(),
  }),
  (table) => [
    index("idx_user_addresses_type").using(
      "btree",
      table.type.asc().nullsLast(),
    ),
    index("idx_user_addresses_user_id").using(
      "btree",
      table.userId.asc().nullsLast().op("int8_ops"),
    ),
    // check(
    //   "chk_address_type",
    //   sql`(type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying, 'both'::character varying])::text[])`,
    // ),
  ],
);

const gnafReturnValue = {
  Province: "تهران - منطقه 16",
  TownShip: "تهران",
  Zone: "مرکزی",
  Village: "",
  LocalityType: "شهر",
  LocalityName: "تهران",
  LocalityCode: 99999,
  SubLocality: "سیدخندان",
  Street: "خیابان شهید آّیت اله قدوسی",
  Street2: "خیابان دکترعلی شریعتی",
  HouseNumber: 0.0,
  Floor: "اول",
  SideFloor: "",
  BuildingName: "ساختمان شرکت پست",
  Description: "ورودی20",
  PostCode: "1631713911",
};
