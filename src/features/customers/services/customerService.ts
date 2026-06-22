
import { Customer } from "../../../types/customer";
import { CustomerFormData } from "../types";
import storage from "../../../storage/storage";


const STORAGE_KEY = "@homebusinesspos/customers";

class CustomerService {
  async getAll(): Promise<Customer[]> {
 try {
  const data =
    await storage.get<Customer[]>(STORAGE_KEY);

  return data ?? [];
} catch (error) {
  console.error(
    "Failed to load customers:",
    error
  );

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

await storage.set(
  STORAGE_KEY,
  customers
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

await storage.set(
  STORAGE_KEY,
  customers
);

    return customers[index];
  }

  async delete(id: string): Promise<void> {
    const customers = await this.getAll();

    const filtered = customers.filter(
      (item) => item.id !== id
    );

   await storage.set(
  STORAGE_KEY,
  filtered
);
  }
}

export default new CustomerService();