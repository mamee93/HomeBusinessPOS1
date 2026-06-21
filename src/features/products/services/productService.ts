import AsyncStorage from "@react-native-async-storage/async-storage";

import { Product } from "../../../types/product";
import { ProductFormData } from "../types";

 
import storage from "../../../storage/storage";


const STORAGE_KEY = "@homebusinesspos/products";

class ProductService {
  async getAll(): Promise<Product[]> {
    try {
      const data =
    await storage.get<string>(STORAGE_KEY);

      if (!data) {
        return [];
      }
      console.log(JSON.parse(data));
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      return [];
    }
  }

  async getById(
    id: string
  ): Promise<Product | null> {
    const products = await this.getAll();

    return (
      products.find(
        (product) => product.id === id
      ) ?? null
    );
  }


  private async generateSKU(): Promise<string> {
  const products = await this.getAll();

  return `SKU-${(products.length + 1)
    .toString()
    .padStart(6, "0")}`;
}

private async generateBarcode(): Promise<string> {
  const products = await this.getAll();

  return `629${(products.length + 1)
    .toString()
    .padStart(9, "0")}`;
}


  async create(
    data: ProductFormData
  ): Promise<Product> {
    const products = await this.getAll();

    const now = new Date().toISOString();

    const product: Product = {
  id: Date.now().toString(),

  createdAt: now,

  updatedAt: now,

  ...data,

  sku:
    data.sku?.trim() ||
    (await this.generateSKU()),

  barcode:
    data.barcode?.trim() ||
    (await this.generateBarcode()),
};

    products.push(product);

    await storage.set(
    STORAGE_KEY,
    products
);

    return product;
  }

  async update(
    id: string,
    data: ProductFormData
  ): Promise<Product> {
    const products = await this.getAll();

    const index = products.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Product not found");
    }

    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );

    return products[index];
  }

  async delete(
    id: string
  ): Promise<void> {
    const products = await this.getAll();

    const filtered = products.filter(
      (item) => item.id !== id
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(filtered)
    );
  }

  async replaceAll(
    products: Product[]
  ): Promise<void> {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );
  }

  async clear(): Promise<void> {
    await storage.remove(
    STORAGE_KEY
);
  }

  async updateStock(
    productId: string,
    stockChange: number
  ): Promise<Product> {
    const products = await this.getAll();

    const index = products.findIndex(
      (item) => item.id === productId
    );

    if (index === -1) {
      throw new Error("Product not found");
    }

    const product = products[index];

    const newStock =
      product.stock + stockChange;

    if (newStock < 0) {
      throw new Error(
        "Insufficient stock"
      );
    }

    products[index] = {
      ...product,
      stock: newStock,
      updatedAt:
        new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );

    return products[index];
  }

  async hasStock(
    productId: string,
    quantity: number
  ): Promise<boolean> {
    const product =
      await this.getById(productId);

    if (!product) {
      return false;
    }

    return product.stock >= quantity;
  }

  async updateStocks(
    items: {
      productId: string;
      quantity: number;
    }[]
  ): Promise<void> {
    for (const item of items) {
      await this.updateStock(
        item.productId,
        -item.quantity
      );
    }
  }

  async restoreStocks(
    items: {
      productId: string;
      quantity: number;
    }[]
  ): Promise<void> {
    for (const item of items) {
      await this.updateStock(
        item.productId,
        item.quantity
      );
    }
  }

  async search(
    keyword: string
  ): Promise<Product[]> {
    const products = await this.getAll();

    const query = keyword
      .trim()
      .toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(query) ||
        product.sku
          .toLowerCase()
          .includes(query) ||
        product.barcode
          ?.toLowerCase()
          .includes(query)
    );
  }

  async getLowStockProducts(): Promise<
    Product[]
  > {
    const products =
      await this.getAll();

    return products.filter(
      (product) =>
        product.stock <=
        product.minStock
    );
  }

  async exists(
    productId: string
  ): Promise<boolean> {
    const product =
      await this.getById(productId);

    return product !== null;
  }
}

export default new ProductService();