import { InferSelectModel } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

export type UpdateModel<T extends { id: any }> = Partial<T> & {
  id: T["id"];
};
