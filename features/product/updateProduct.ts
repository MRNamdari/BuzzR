import { fromPromise } from "neverthrow";
import { db } from "@/db/client";
import { products, UpdateProduct } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export default async function updateProduct(data: UpdateProduct) {
  return fromPromise(
    db.update(products).set(data).where(eq(products.id, data.id)),
    (err) => err,
  );
}

updateProduct({
  id: BigInt(1),
  name: "Updated Product Name",
  basePrice: "19.99",
});
