import { STORAGE_KEYS } from "../constants";
import { Customer } from "../types/customer";
import { getItem, setItem } from "./storage";

export async function getCustomers(): Promise<Customer[]> {
  const customers = await getItem<Customer[]>(
    STORAGE_KEYS.CUSTOMERS
  );

  return customers ?? [];
}

export async function saveCustomers(
  customers: Customer[]
): Promise<void> {
  await setItem(STORAGE_KEYS.CUSTOMERS, customers);
}

export async function getCustomerById(
  id: string
): Promise<Customer | undefined> {
  const customers = await getCustomers();

  return customers.find((item) => item.id === id);
}

export async function addCustomer(
  customer: Customer
): Promise<void> {
  const customers = await getCustomers();

  customers.push(customer);

  await saveCustomers(customers);
}

export async function updateCustomer(
  customer: Customer
): Promise<void> {
  const customers = await getCustomers();

  await saveCustomers(
    customers.map((item) =>
      item.id === customer.id ? customer : item
    )
  );
}

export async function deleteCustomer(
  id: string
): Promise<void> {
  const customers = await getCustomers();

  await saveCustomers(
    customers.filter((item) => item.id !== id)
  );
}