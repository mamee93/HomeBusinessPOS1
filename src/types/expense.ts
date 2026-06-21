import { BaseEntity } from "./common";

export interface Expense extends BaseEntity {
  title: string;

  amount: number;

  category: string;

  date: string;

  notes?: string;
}