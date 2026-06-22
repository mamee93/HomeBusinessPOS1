import {useCallback,useEffect,useState,} from "react";

import { DashboardData } from "../types/dashboard";

export default function useDashboard() {
  const [loading, setLoading] =
    useState(true);

const [dashboard, setDashboard] =
  useState<DashboardData | null>(null);
  
  const loadDashboard =
    useCallback(async () => {
     

    
    }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    loading,

    dashboard,

    refresh: loadDashboard,
  };
}