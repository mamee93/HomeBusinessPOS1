import { useCallback, useEffect, useState } from "react";

import { Invoice } from "../../../types/invoice";
import { CreateInvoiceData } from "../types";

import invoiceService from "../services/invoiceService";

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);

      const data = await invoiceService.getAll();

      setInvoices(data);
    } catch (error) {
      console.error("Failed to load invoices:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  const createInvoice = async (
    data: CreateInvoiceData
  ) => {
    const invoice = await invoiceService.create(data);

    await loadInvoices();

    return invoice;
  };

  const deleteInvoice = async (id: string) => {
    await invoiceService.delete(id);

    await loadInvoices();
  };

  return {
    invoices,
    loading,
    refresh: loadInvoices,
    createInvoice,
    deleteInvoice,
  };
}