import { CartItem, CartTotals } from "../types/cart";

export interface TotalsOptions {
  discount?: number;
  taxRate?: number;
}

export function calculateCartTotals(
  items: CartItem[],
  options: TotalsOptions = {}
): CartTotals {
  const { discount = 0, taxRate = 0 } = options;

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const safeDiscount = Math.min(discount, subtotal);

  const taxableAmount = subtotal - safeDiscount;

  const tax = taxableAmount * (taxRate / 100);

  const total = taxableAmount + tax;

  const itemsCount = items.length;

  const quantityCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return {
    subtotal: round(subtotal),
    discount: round(safeDiscount),
    tax: round(tax),
    total: round(total),
    itemsCount,
    quantityCount,
  };
}

export function calculateItemTotal(
  unitPrice: number,
  quantity: number
): number {
  return round(unitPrice * quantity);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}