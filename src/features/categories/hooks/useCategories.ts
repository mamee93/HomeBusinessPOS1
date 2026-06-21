import { useCallback, useEffect, useState } from "react";

import { Category } from "../../../types/category";
import { CategoryFormData } from "../types";

import categoryService from "../services/categoryService";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);

      const data = await categoryService.getAll();

      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const createCategory = async (
    data: CategoryFormData
  ) => {
    await categoryService.create(data);

    await loadCategories();
  };

  const updateCategory = async (
    id: string,
    data: CategoryFormData
  ) => {
    await categoryService.update(id, data);

    await loadCategories();
  };

  const deleteCategory = async (
    id: string
  ) => {
    await categoryService.delete(id);

    await loadCategories();
  };

  return {
    categories,

    loading,

    refresh: loadCategories,

    createCategory,

    updateCategory,

    deleteCategory,
  };
}