import { useMemo } from "react";

import useCategories from "./useCategories";

export default function useCategoryLookup() {
  const { categories } = useCategories();

  const lookup = useMemo(() => {
    const map = new Map<string, string>();

    categories.forEach((category) => {
      map.set(category.id, category.name);
    });

    return map;
  }, [categories]);

  const getCategoryName = (
    id?: string
  ) => {
    if (!id) {
      return "-";
    }

    return lookup.get(id) ?? "-";
  };

  const getCategory = (
    id?: string
  ) => {
    if (!id) {
      return undefined;
    }

    return categories.find(
      (item) => item.id === id
    );
  };

  return {
    categories,
    getCategory,
    getCategoryName,
  };
}