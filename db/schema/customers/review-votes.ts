import { pgTable, unique } from "drizzle-orm/pg-core";
import { reviews } from "./reviews";
import { users } from "./users";

export const reviewVotes = pgTable(
  "review_votes",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    reviewId: t
      .bigint("review_id", { mode: "number" })
      .references(() => reviews.id, { onDelete: "cascade" })
      .notNull(),
    userId: t
      .bigint("user_id", { mode: "number" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    isHelpful: t.boolean("is_helpful").notNull(),
    createdAt: t
      .timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    unique("review_votes_review_id_user_id_key").on(
      table.reviewId,
      table.userId,
    ),
  ],
);
