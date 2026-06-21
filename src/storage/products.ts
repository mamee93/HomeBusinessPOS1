import { STORAGE_KEYS } from "../constants";
import { Product } from "../types/product";
import storage from "./storage";

export async function getProducts(): Promise<Product[]> {
 const products = await storage.get<Product[]>(
  STORAGE_KEYS.PRODUCTS
);

  return products ?? [];
}

export async function saveProducts(
  products: Product[]
): Promise<void> {
  await storage.set(
  STORAGE_KEYS.PRODUCTS,
  products
);
}

export async function getProductById(
  id: string
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((item) => item.id === id);
}

export async function addProduct(
  product: Product
): Promise<void> {
  const products = await getProducts();

  products.push(product);

  await saveProducts(products);
}

export async function updateProduct(
  product: Product
): Promise<void> {
  const products = await getProducts();

  const updated = products.map((item) =>
    item.id === product.id ? product : item
  );

  await saveProducts(updated);
}

export async function deleteProduct(
  id: string
): Promise<void> {
  const products = await getProducts();

  await saveProducts(
    products.filter((item) => item.id !== id)
  );
}