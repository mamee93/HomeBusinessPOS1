import React from "react";
import {AppPage,AppText,} from "../../../components/ui";
import DashboardStats from "../components/DashboardStats";
import LowStockProducts from "../components/LowStockProducts";
import RecentInvoices from "../components/RecentInvoices";
import TopProducts from "../components/TopProducts";
import useAnalytics from "../../../core/analytics/hooks/useAnalytics";


export default function DashboardScreen() {
 const {
  loading,
  analytics,
} = useAnalytics();

  if (loading || !analytics) {
    return (
      <AppPage title="لوحة التحكم">
        <AppText>
          جاري التحميل...
        </AppText>
      </AppPage>
    );
  }

  return (
    <AppPage
      title="لوحة التحكم"
      scrollable
    >
      <DashboardStats
        todaySales={analytics.todaySales}
        weekSales={analytics.weekSales}
        monthSales={analytics.monthSales}
        lowStockCount={
        analytics.lowStockProducts.length
      }
      />
      
      <LowStockProducts
  products={analytics.lowStockProducts}
/>
<RecentInvoices
  invoices={analytics.invoices}
/>
<TopProducts
  products={analytics.topProducts}
/>
    </AppPage>
  );
}