import { useEffect, useState } from "react";
import { DashboardStats } from "../types";

const initialState: DashboardStats = {
  totalSales: 0,
  totalProfit: 0,
  totalOrders: 0,
  totalCustomers: 0,
  lowStockProducts: 0,
};

export function useDashboard() {
  const [stats, setStats] =
    useState<DashboardStats>(initialState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      // سيتم ربط البيانات الحقيقية لاحقًا
      setStats(initialState);
    } finally {
      setLoading(false);
    }
  }

  return {
    stats,
    loading,
    refresh: loadDashboard,
  };
}