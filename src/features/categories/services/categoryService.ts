 
import { Category } from "../../../types/category";
import { CategoryFormData } from "../types";
import storage from "../../../storage/storage";
const STORAGE_KEY = "@homebusinesspos/categories";

class CategoryService {
  async getAll(): Promise<Category[]> {
    try {
      const data =
  await storage.get<Category[]>(STORAGE_KEY);

return data ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getById(id: string): Promise<Category | null> {
    const categories = await this.getAll();

    return (
      categories.find(
        (item) => item.id === id
      ) ?? null
    );
  }

  async create(
    data: CategoryFormData
  ): Promise<Category> {
    const categories = await this.getAll();

    const now = new Date().toISOString();

    const category: Category = {
      id: Date.now().toString(),

      createdAt: now,

      updatedAt: now,

      ...data,

      isActive: true,
    };

    categories.push(category);

    await storage.set(
  STORAGE_KEY,
  categories
);

    return category;
  }

  async update(
    id: string,
    data: CategoryFormData
  ): Promise<Category> {
    const categories = await this.getAll();

    const index = categories.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Category not found");
    }

    categories[index] = {
      ...categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await storage.set(
  STORAGE_KEY,
  categories
);

    return categories[index];
  }

  async delete(id: string): Promise<void> {
    const categories = await this.getAll();

    const filtered = categories.filter(
      (item) => item.id !== id
    );

  await storage.set(
  STORAGE_KEY,
  filtered
);
  }
}

export default new CategoryService();