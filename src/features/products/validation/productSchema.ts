import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "اسم المنتج مطلوب"),

  sku: z.string().min(1, "SKU مطلوب"),

  barcode: z.string().optional(),

  categoryId: z.string().min(1, "التصنيف مطلوب"),

  description: z.string().optional(),

  costPrice: z.number(),

  sellingPrice: z.number(),

  stock: z.number(),

  minStock: z.number(),

  unit: z.string(),

  image: z.string().optional(),

  isActive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;