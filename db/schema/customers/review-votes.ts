import { foreignKey, pgTable, unique } from "drizzle-orm/pg-core";
import { reviews } from "./reviews";
import { users } from "./users";

export const reviewVotes = pgTable(
  "review_votes",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    reviewId: t.bigint("review_id", { mode: "number" }).notNull(),
    userId: t.bigint("user_id", { mode: "number" }).notNull(),
    isHelpful: t.boolean("is_helpful").notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    foreignKey({
      columns: [table.reviewId],
      foreignColumns: [reviews.id],
      name: "fk_review_votes_review",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_review_votes_user",
    }).onDelete("cascade"),
    unique("review_votes_review_id_user_id_key").on(
      table.reviewId,
      table.userId,
    ),
  ],
);
