import { Product } from "../../../types/product";

export type ProductFormData = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;