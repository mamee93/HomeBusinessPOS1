import productService from "../../../features/products/services/productService";
import customerService from "../../../features/customers/services/customerService";
import invoiceService from "../../../features/invoices/services/invoiceService";
import { AnalyticsFilter } from "../types/dateFilter";
import { filterInvoices } from "../utils/filter";
import {
  calculateTodaySales,
  calculateWeekSales,
  calculateMonthSales,
  calculateYearSales,
  calculateRevenue,

  getCompletedInvoices,
  getCancelledInvoices,
  getDraftInvoices,
  getAverageInvoice,

  getLowStockProducts,
  getTopProducts,

  getTopCustomers,
} from "../utils";
import { AnalyticsData } from "../types/analytics";

class AnalyticsService {
  async getAnalytics(
  filter?: AnalyticsFilter
): Promise<AnalyticsData> {
    
  
  const [
  products,
  customers,
  invoices,
] = await Promise.all([
  productService.getAll(),
  customerService.getAll(),
  invoiceService.getAll(),
]);

const filteredInvoices =
  filterInvoices(invoices, filter);


   return {
  invoices: filteredInvoices,

  products,

  customers,

  todaySales:
    calculateTodaySales(filteredInvoices),

  weekSales:
    calculateWeekSales(filteredInvoices),

  monthSales:
    calculateMonthSales(filteredInvoices),

  yearSales:
    calculateYearSales(filteredInvoices),

  totalRevenue:
    calculateRevenue(filteredInvoices),

  averageInvoice:
    getAverageInvoice(filteredInvoices),

  completedInvoices:
    getCompletedInvoices(filteredInvoices),

  cancelledInvoices:
    getCancelledInvoices(filteredInvoices),

  draftInvoices:
    getDraftInvoices(filteredInvoices),

  lowStockProducts:
    getLowStockProducts(products),

  topProducts:
    getTopProducts(filteredInvoices),

  topCustomers:
    getTopCustomers(filteredInvoices),
};

} // نهاية getAnalytics

} // نهاية AnalyticsService

export default new AnalyticsService();