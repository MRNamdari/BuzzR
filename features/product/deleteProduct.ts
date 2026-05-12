import { db } from "@/db/client";
import { products } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { fromPromise } from "neverthrow";

export default async function deleteProduct(id: bigint) {
  return fromPromise(
    db
      .update(products)
      .set({ publishStatus: "draft", deletedAt: new Date().toISOString() })
      .where(eq(products.id, id)),
    (err) => err,
  );
}
