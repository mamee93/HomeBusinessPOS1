import analyticsService from "./analyticsService";
import { ReportsData } from "../types/reports";
import { AnalyticsFilter } from "../types/dateFilter";

class ReportsService {
  async getReports(
  filter?: AnalyticsFilter
): Promise<ReportsData> {
    const analytics =
      await analyticsService.getAnalytics();

    return {
      sales: {
        today: analytics.todaySales,
        week: analytics.weekSales,
        month: analytics.monthSales,
        year: analytics.yearSales,
        revenue: analytics.totalRevenue,
        averageInvoice: analytics.averageInvoice,
      },

      invoices: {
        total: analytics.invoices.length,
        completed: analytics.completedInvoices,
        cancelled: analytics.cancelledInvoices,
        draft: analytics.draftInvoices,
      },

      inventory: {
        totalProducts: analytics.products.length,
        lowStockProducts:
          analytics.lowStockProducts,
      },

      customers: {
        totalCustomers:
          analytics.customers.length,
        topCustomers:
          analytics.topCustomers,
      },

      recentInvoices:
        analytics.invoices,

      topProducts:
        analytics.topProducts,
    };
  }
}

export default new ReportsService();