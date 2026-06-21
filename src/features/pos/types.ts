import { PaymentMethod } from "@/types/invoice";
import { Product } from "@/types/product";

export interface CartItem {
  product: Product;

  quantity: number;

  subtotal: number;
}

export interface POSState {
  customerId?: string;

  customerName?: string;

  paymentMethod: PaymentMethod;

  discount: number;

  tax: number;

  notes: string;

  cart: CartItem[];
}