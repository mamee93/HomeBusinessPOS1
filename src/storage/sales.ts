import { STORAGE_KEYS } from "../constants";

import { Sale } from "../features/pos/types/sale";

import storage from "./storage";

export async function getSales(): Promise<Sale[]> {
  const sales = await storage.get<Sale[]>(
    STORAGE_KEYS.SALES
  );

  return sales ?? [];
}

export async function saveSales(
  sales: Sale[]
): Promise<void> {
  await storage.set(STORAGE_KEYS.SALES, sales);
}

export async function getSaleById(
  id: string
): Promise<Sale | undefined> {
  const sales = await getSales();

  return sales.find((sale) => sale.id === id);
}

export async function addSale(
  sale: Sale
): Promise<void> {
  const sales = await getSales();

  sales.push(sale);

  await saveSales(sales);
}

export async function updateSale(
  sale: Sale
): Promise<void> {
  const sales = await getSales();

  const updated = sales.map((item) =>
    item.id === sale.id ? sale : item
  );

  await saveSales(updated);
}

export async function deleteSale(
  id: string
): Promise<void> {
  const sales = await getSales();

  await saveSales(
    sales.filter((item) => item.id !== id)
  );
}

export async function generateInvoiceNumber(): Promise<string> {
  const sales = await getSales();

  const nextNumber = sales.length + 1;

  return `INV-${nextNumber
    .toString()
    .padStart(6, "0")}`;
}