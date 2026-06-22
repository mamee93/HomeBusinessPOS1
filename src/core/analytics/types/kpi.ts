export interface KPI {
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  trend: "up" | "down" | "same";
}