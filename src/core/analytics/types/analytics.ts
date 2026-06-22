import { Customer } from "../../../types/customer";
import { Invoice } from "../../../types/invoice";
import { Product } from "../../../types/product";

export interface TopProduct {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
}

export interface TopCustomer {
  customerId: string;
  customerName: string;
  invoices: number;
  total: number;
}

export interface AnalyticsData {
  invoices: Invoice[];

  products: Product[];

  customers: Customer[];

  todaySales: number;

  weekSales: number;

  monthSales: number;

  yearSales: number;

  totalRevenue: number;

  averageInvoice: number;

  completedInvoices: number;

  cancelledInvoices: number;

  draftInvoices: number;

  lowStockProducts: Product[];

  topProducts: TopProduct[];

  topCustomers: TopCustomer[];
}