import { useCallback, useEffect, useState } from "react";

import analyticsService from "../services/analyticsService";
import { AnalyticsData } from "../types/analytics";

export default function useAnalytics() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await analyticsService.getAnalytics();

      setAnalytics(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    loading,
    analytics,
    refresh: loadAnalytics,
  };
}