import React, { useState } from "react";

import {
  AppEmptyState,
  AppLoading,
  AppPage,
} from "../../../components/ui";

import useReports from "../../../core/analytics/hooks/useReports";
import { AnalyticsPeriod } from "../../../core/analytics/types/dateFilter";

import ReportPeriodSelector from "../components/ReportPeriodSelector";
import SalesOverview from "../components/SalesOverview";
import RevenueOverview from "../components/RevenueOverview";

export default function ReportsScreen() {
  const [period, setPeriod] =
    useState<AnalyticsPeriod>("month");

  const {
    loading,
    reports,
  } = useReports(period);

  if (loading) {
    return <AppLoading />;
  }

  if (!reports) {
    return (
      <AppEmptyState
        title="لا توجد بيانات"
        description="لا توجد بيانات لعرضها."
      />
    );
  }

  return (
    <AppPage
      title="التقارير"
      scrollable
    >
      <ReportPeriodSelector
        value={period}
        onChange={setPeriod}
      />

      <SalesOverview
        today={reports.sales.today}
        week={reports.sales.week}
        month={reports.sales.month}
        year={reports.sales.year}
      />

      <RevenueOverview
  revenue={reports.sales.revenue}
  averageInvoice={
    reports.sales.averageInvoice
  }
/>
    </AppPage>
  );
}