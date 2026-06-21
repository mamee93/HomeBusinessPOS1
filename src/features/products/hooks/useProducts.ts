import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

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
      console.error(
        "Failed to load products:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const createProduct = async (
    data: Parameters<
      typeof productService.create
    >[0]
  ) => {
    const product =
      await productService.create(data);

    await loadProducts();

    return product;
  };

  const updateProduct = async (
    id: string,
    data: Parameters<
      typeof productService.update
    >[1]
  ) => {
    const product =
      await productService.update(
        id,
        data
      );

    await loadProducts();

    return product;
  };

  const deleteProduct = async (
    id: string
  ) => {
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