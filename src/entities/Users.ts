import { defineEntity, p } from "@mikro-orm/core";
import { AuditLogs } from "./AuditLogs";
import { Carts } from "./Carts";
import { Favorites } from "./Favorites";
import { MediaVersions } from "./MediaVersions";
import { Orders } from "./Orders";
import { ProductStatusHistory } from "./ProductStatusHistory";
import { ProductVersions } from "./ProductVersions";
import { PromotionUsage } from "./PromotionUsage";
import { ReviewVotes } from "./ReviewVotes";
import { Reviews } from "./Reviews";
import { Roles } from "./Roles";
import { UserAddresses } from "./UserAddresses";
import { UserAttributes } from "./UserAttributes";
import { UserTierAssignments } from "./UserTierAssignments";
import { Wallets } from "./Wallets";
import { Wishlists } from "./Wishlists";

const UsersSchema = defineEntity({
  name: "users",
  properties: {
    id: p.bigint().primary(),
    email: p.text().unique("users_email_key"),
    birthday: p.date().nullable(),
    phoneNumber: p.string().length(15).unique("users_phone_number_key"),
    lastLogin: p.datetime().nullable(),
    status: p.string().length(20).index("idx_users_status"),
    createdAt: p.datetime().defaultRaw(`now()`).index("idx_users_created_at"),
    updatedAt: p.datetime().defaultRaw(`now()`),
    userRoles: () =>
      p
        .manyToMany(Roles)
        .pivotTable("user_roles")
        .joinColumn("user_id")
        .inverseJoinColumn("role_id"),
    auditLogsCollection: () => p.oneToMany(AuditLogs).mappedBy("actorUser"),
    cartsCollection: () => p.oneToMany(Carts).mappedBy("user"),
    favoritesCollection: () => p.oneToMany(Favorites).mappedBy("user"),
    mediaVersionsCollection: () =>
      p.oneToMany(MediaVersions).mappedBy("createdBy"),
    ordersCollection: () => p.oneToMany(Orders).mappedBy("user"),
    productStatusHistoryCollection: () =>
      p.oneToMany(ProductStatusHistory).mappedBy("changedBy"),
    productVersionsCollection: () =>
      p.oneToMany(ProductVersions).mappedBy("createdBy"),
    promotionUsageCollection: () =>
      p.oneToMany(PromotionUsage).mappedBy("user"),
    reviewVotesCollection: () => p.oneToMany(ReviewVotes).mappedBy("user"),
    reviewsCollection: () => p.oneToMany(Reviews).mappedBy("user"),
    userAddressesCollection: () => p.oneToMany(UserAddresses).mappedBy("user"),
    userAttributesCollection: () =>
      p.oneToMany(UserAttributes).mappedBy("user"),
    userTierAssignments: () =>
      p.oneToOne(UserTierAssignments).ref().mappedBy("user"),
    walletsCollection: () => p.oneToMany(Wallets).mappedBy("user"),
    wishlistsCollection: () => p.oneToMany(Wishlists).mappedBy("user"),
  },
});

export class Users extends UsersSchema.class {}

UsersSchema.setClass(Users);
