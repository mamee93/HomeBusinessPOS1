import { AnalyticsData } from "../types/analytics";

export interface DashboardCard {
  title: string;
  value: string | number;
  subtitle?: string;
}

export interface DashboardData {
  sales: DashboardCard[];
  invoices: DashboardCard[];
  inventory: DashboardCard[];
}

export function mapAnalyticsToDashboard(
  analytics: AnalyticsData
): DashboardData {
  return {
    sales: [
      {
        title: "مبيعات اليوم",
        value: analytics.todaySales,
      },
      {
        title: "مبيعات الأسبوع",
        value: analytics.weekSales,
      },
      {
        title: "مبيعات الشهر",
        value: analytics.monthSales,
      },
      {
        title: "مبيعات السنة",
        value: analytics.yearSales,
      },
    ],

    invoices: [
      {
        title: "الإيرادات",
        value: analytics.totalRevenue,
      },
      {
        title: "متوسط الفاتورة",
        value: analytics.averageInvoice,
      },
      {
        title: "الفواتير المكتملة",
        value: analytics.completedInvoices,
      },
      {
        title: "المسودات",
        value: analytics.draftInvoices,
      },
    ],

    inventory: [
      {
        title: "العملاء",
        value: analytics.customers.length,
      },
      {
        title: "المنتجات",
        value: analytics.products.length,
      },
      {
        title: "منخفض المخزون",
        value: analytics.lowStockProducts.length,
      },
      {
        title: "الملغاة",
        value: analytics.cancelledInvoices,
      },
    ],
  };
}