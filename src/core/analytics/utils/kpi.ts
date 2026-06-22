import { KPI } from "../types/kpi";

export function createKPI(
  title: string,
  current: number,
  previous: number
): KPI {
  const change = current - previous;

  const changePercentage =
    previous === 0
      ? 100
      : (change / previous) * 100;

  return {
    title,
    value: current,
    previousValue: previous,
    change,
    changePercentage,
    trend:
      change > 0
        ? "up"
        : change < 0
        ? "down"
        : "same",
  };
}