import { BaseEntity } from "./common";

export type InvoiceStatus =
  | "draft"
  | "completed"
  | "cancelled";

export type PaymentMethod =
  | "cash"
  | "card"
  | "bank"
  | "mixed";

export interface InvoiceItem {
  productId: string;

  productName: string;

  quantity: number;

  unitPrice: number;

  costPrice: number;

  total: number;
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;

  customerId?: string;

  customerName?: string;

  items: InvoiceItem[];

  subtotal: number;

  discount: number;

  tax: number;

  total: number;

  paymentMethod: PaymentMethod;

  status: InvoiceStatus;

  notes?: string;
}