import { Customer } from "../../../types/customer";
import { Invoice } from "../../../types/invoice";
import { Product } from "../../../types/product";

export interface DashboardData {
  invoices: Invoice[];

  products: Product[];

  customers: Customer[];

  todaySales: number;

  weekSales: number;

  monthSales: number;

  lowStockProducts: Product[];
  
  topProducts: TopProduct[];
}
export interface TopProduct {
  productId: string;

  productName: string;

  quantity: number;

  total: number;
}