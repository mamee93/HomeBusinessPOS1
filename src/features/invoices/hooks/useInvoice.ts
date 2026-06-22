import { useCallback, useEffect, useState } from "react";

import { Invoice } from "../../../types/invoice";

import invoiceService from "../services/invoiceService";

export default function useInvoice(
  id?: string
) {
  const [invoice, setInvoice] =
    useState<Invoice | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadInvoice =
    useCallback(async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await invoiceService.getById(id);

        setInvoice(data);
      } catch (err) {
        console.error(err);

        setError(
          "فشل تحميل الفاتورة"
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    loadInvoice();
  }, [loadInvoice]);

  const refresh = async () => {
    await loadInvoice();
  };

  const cancel = async () => {
    if (!invoice) {
      return;
    }

    const updated =
      await invoiceService.cancel(
        invoice.id
      );

    setInvoice(updated);
  };

  return {
    invoice,

    loading,

    error,

    refresh,

    cancel,
  };
}