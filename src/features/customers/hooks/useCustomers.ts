import { useCallback, useEffect, useState } from "react";

import { Customer } from "../../../types/customer";
import { CustomerFormData } from "../types";

import customerService from "../services/customerService";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const data = await customerService.getAll();

      setCustomers(data);
    } catch (error) {
      console.error("Failed to load customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const createCustomer = async (
    data: CustomerFormData
  ) => {
    await customerService.create(data);

    await loadCustomers();
  };

  const updateCustomer = async (
    id: string,
    data: CustomerFormData
  ) => {
    await customerService.update(id, data);

    await loadCustomers();
  };

  const deleteCustomer = async (
    id: string
  ) => {
    await customerService.delete(id);

    await loadCustomers();
  };

  return {
    customers,
    loading,
    refresh: loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}