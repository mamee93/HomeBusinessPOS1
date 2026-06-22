export type AnalyticsPeriod =
  | "today"
  | "week"
  | "month"
  | "year"
  | "all"
  | "custom";

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export interface AnalyticsFilter {
  period: AnalyticsPeriod;
  range?: DateRange;
}