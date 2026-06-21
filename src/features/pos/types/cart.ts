import { Product } from "../../../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemsCount: number;
  quantityCount: number;
}

export interface CartState {
  items: CartItem[];
  totals: CartTotals;
}