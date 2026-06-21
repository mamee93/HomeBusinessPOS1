import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

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
      console.error(
        "Failed to load categories:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [loadCategories])
  );

  const createCategory = async (
    data: CategoryFormData
  ) => {
    const category =
      await categoryService.create(data);

    await loadCategories();

    return category;
  };

  const updateCategory = async (
    id: string,
    data: CategoryFormData
  ) => {
    const category =
      await categoryService.update(id, data);

    await loadCategories();

    return category;
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