import { useCallback, useEffect, useState } from "react";

import reportsService from "../services/reportsService";
import { ReportsData } from "../types/reports";
import { AnalyticsPeriod } from "../types/dateFilter";

export default function useReports(
  period: AnalyticsPeriod = "all"
) {
  const [loading, setLoading] = useState(true);

  const [reports, setReports] =
    useState<ReportsData | null>(null);

const loadReports = useCallback(async () => {
  try {
    setLoading(true);

    const data = await reportsService.getReports({
      period,
    });

    setReports(data);
  } finally {
    setLoading(false);
  }
}, [period]);
useEffect(() => {
  loadReports();
}, [loadReports]);

  return {
    loading,
    reports,
    refresh: loadReports,
  };
}