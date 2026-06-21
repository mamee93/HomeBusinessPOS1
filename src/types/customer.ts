import { BaseEntity } from "./common";

export interface Customer extends BaseEntity {
  name: string;

  phone: string;

  email?: string;

  address?: string;

  notes?: string;

  isActive: boolean;
}