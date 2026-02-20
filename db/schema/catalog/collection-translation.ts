import { foreignKey, pgTable, unique } from "drizzle-orm/pg-core";
import { collections } from "./collections";

export const collectionTranslations = pgTable(
  "collection_translations",
  (t) => ({
    id: t.bigserial({ mode: "bigint" }).primaryKey().notNull(),
    collectionId: t.bigint("collection_id", { mode: "number" }).notNull(),
    locale: t.varchar({ length: 10 }).notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    description: t.text(),
  }),
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "fk_collection_translations_collection",
    }).onDelete("cascade"),
    unique("collection_translations_collection_id_locale_key").on(
      table.collectionId,
      table.locale,
    ),
  ],
);
