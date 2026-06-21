import { useCallback, useEffect, useState } from "react";

import { Invoice, InvoiceItem } from "../../../types/invoice";
import { InvoiceFormData } from "../types";

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
    form: InvoiceFormData,
    items: InvoiceItem[],
    customerName?: string
  ) => {
    const invoice = await invoiceService.create(
      form,
      items,
      customerName
    );

    await loadInvoices();

    return invoice;
  };

  const updateInvoice = async (
    id: string,
    data: Partial<Invoice>
  ) => {
    const invoice = await invoiceService.update(
      id,
      data
    );

    await loadInvoices();

    return invoice;
  };

  const deleteInvoice = async (
    id: string
  ) => {
    await invoiceService.delete(id);

    await loadInvoices();
  };

  const cancelInvoice = async (
    id: string
  ) => {
    const invoice = await invoiceService.cancel(id);

    await loadInvoices();

    return invoice;
  };

  return {
    invoices,
    loading,
    refresh: loadInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    cancelInvoice,
  };
}