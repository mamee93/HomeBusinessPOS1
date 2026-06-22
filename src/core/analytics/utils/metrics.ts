import { KPI } from "../types/kpi";

export function calculatePercentage(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export function calculateGrowth(
  current: number,
  previous: number
) {
  return current - previous;
}

export function createKPI(
  title: string,
  current: number,
  previous: number
): KPI {
  const change =
    calculateGrowth(current, previous);

  const percentage =
    calculatePercentage(current, previous);

  return {
    title,

    value: current,

    previousValue: previous,

    change,

    changePercentage: percentage,

    trend:
      change > 0
        ? "up"
        : change < 0
        ? "down"
        : "same",
  };
}