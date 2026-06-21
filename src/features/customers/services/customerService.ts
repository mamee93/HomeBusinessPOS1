import AsyncStorage from "@react-native-async-storage/async-storage";

import { Customer } from "../../../types/customer";
import { CustomerFormData } from "../types";

const STORAGE_KEY = "@homebusinesspos/customers";

class CustomerService {
  async getAll(): Promise<Customer[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to load customers:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Customer | null> {
    const customers = await this.getAll();

    return (
      customers.find((item) => item.id === id) ??
      null
    );
  }

  async create(
    data: CustomerFormData
  ): Promise<Customer> {
    const customers = await this.getAll();

    const now = new Date().toISOString();

    const customer: Customer = {
      id: Date.now().toString(),

      createdAt: now,

      updatedAt: now,

      ...data,
    };

    customers.push(customer);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customers)
    );

    return customer;
  }

  async update(
    id: string,
    data: CustomerFormData
  ): Promise<Customer> {
    const customers = await this.getAll();

    const index = customers.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Customer not found");
    }

    customers[index] = {
      ...customers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customers)
    );

    return customers[index];
  }

  async delete(id: string): Promise<void> {
    const customers = await this.getAll();

    const filtered = customers.filter(
      (item) => item.id !== id
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(filtered)
    );
  }
}

export default new CustomerService();