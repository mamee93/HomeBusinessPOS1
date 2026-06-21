import { CartItem } from "./cart";

export type PaymentMethod =
  | "cash"
  | "card"
  | "bankTransfer";

export type SaleStatus =
  | "completed"
  | "refunded"
  | "cancelled";

export interface Sale {
  id: string;

  invoiceNumber: string;

  items: CartItem[];

  subtotal: number;

  discount: number;

  tax: number;

  total: number;

  paymentMethod: PaymentMethod;

  status: SaleStatus;

  customerId?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}

export interface CheckoutRequest {
  items: CartItem[];

  paymentMethod: PaymentMethod;

  customerId?: string;

  discount?: number;

  tax?: number;

  notes?: string;
}

export interface CheckoutResult {
  success: boolean;

  sale?: Sale;

  message: string;
}