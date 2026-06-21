export interface ProductFormData {
  name: string;
  sku: string;
  barcode?: string;

  categoryId: string;

  image?: string;
  description?: string;

  costPrice: number;
  sellingPrice: number;

  stock: number;
  minStock: number;

  unit: string;

  isActive: boolean;
}