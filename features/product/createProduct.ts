import { fromPromise } from "neverthrow";
import { db } from "@/db/client";
import { products } from "@/db/schema/schema";
import { InferInsertModel } from "drizzle-orm";

export default async function createProduct(
  data: InferInsertModel<typeof products>,
) {
  return fromPromise(db.insert(products).values(data), (err) => err);
}
