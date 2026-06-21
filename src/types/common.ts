export type ID = string;

export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface DateRange {
  from: string;
  to: string;
}

export type Status = "active" | "inactive";