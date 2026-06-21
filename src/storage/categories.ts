import AsyncStorage from "@react-native-async-storage/async-storage";

import { Category } from "../types/category";

const STORAGE_KEY = "@categories";

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Get Categories Error:", error);
    return [];
  }
}

export async function getCategoryById(
  id: string
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find((item) => item.id === id) ?? null
  );
}

export async function addCategory(
  category: Category
): Promise<void> {
  const categories = await getCategories();

  categories.push(category);

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(categories)
  );
}

export async function updateCategory(
  category: Category
): Promise<void> {
  const categories = await getCategories();

  const index = categories.findIndex(
    (item) => item.id === category.id
  );

  if (index === -1) return;

  categories[index] = category;

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(categories)
  );
}

export async function deleteCategory(
  id: string
): Promise<void> {
  const categories = await getCategories();

  const filtered = categories.filter(
    (item) => item.id !== id
  );

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filtered)
  );
}