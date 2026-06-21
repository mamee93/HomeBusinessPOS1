import { useCallback, useEffect, useState } from "react";

import { Product } from "../../../types/product";
import productService from "../services/productService";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await productService.getAll();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const createProduct = async (
    data: Parameters<typeof productService.create>[0]
  ) => {
    await productService.create(data);

    await loadProducts();
  };

  const updateProduct = async (
    id: string,
    data: Parameters<typeof productService.update>[1]
  ) => {
    await productService.update(id, data);

    await loadProducts();
  };

  const deleteProduct = async (id: string) => {
    await productService.delete(id);

    await loadProducts();
  };

  return {
    products,

    loading,

    refresh: loadProducts,

    createProduct,

    updateProduct,

    deleteProduct,
  };
}