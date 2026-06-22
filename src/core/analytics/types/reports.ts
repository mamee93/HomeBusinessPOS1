import { Invoice } from "../../../types/invoice";
import { Product } from "../../../types/product";
import { Customer } from "../../../types/customer";
import { TopCustomer } from "./analytics";
import { TopProduct } from "./analytics";
export interface SalesReport {
  today: number;
  week: number;
  month: number;
  year: number;
  revenue: number;
  averageInvoice: number;
}

export interface InvoiceReport {
  total: number;
  completed: number;
  cancelled: number;
  draft: number;
}

export interface InventoryReport {
  totalProducts: number;
  lowStockProducts: Product[];
}

export interface CustomerReport {
  totalCustomers: number;
  topCustomers: TopCustomer[];
}

export interface ReportsData {
  sales: SalesReport;
  invoices: InvoiceReport;
  inventory: InventoryReport;
  customers: CustomerReport;

  recentInvoices: Invoice[];
  topProducts: TopProduct[];
}