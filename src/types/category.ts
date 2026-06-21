import { BaseEntity } from "./common";

export interface Category extends BaseEntity {
  name: string;
  color: string;
  icon?: string;
  description?: string;
  isActive: boolean;
}