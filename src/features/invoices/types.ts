import {
  InvoiceStatus,
  PaymentMethod,
} from "@/types/invoice";

export interface InvoiceFormData {
  customerId?: string;

  discount: number;

  tax: number;

  paymentMethod: PaymentMethod;

  status: InvoiceStatus;

  notes?: string;
}