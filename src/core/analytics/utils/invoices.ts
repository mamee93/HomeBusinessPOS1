import { Invoice } from "../../../types/invoice";

export function getCompletedInvoices(
  invoices: Invoice[]
): number {
  return invoices.filter(
    (invoice) => invoice.status === "completed"
  ).length;
}

export function getCancelledInvoices(
  invoices: Invoice[]
): number {
  return invoices.filter(
    (invoice) => invoice.status === "cancelled"
  ).length;
}

export function getDraftInvoices(
  invoices: Invoice[]
): number {
  return invoices.filter(
    (invoice) => invoice.status === "draft"
  ).length;
}

export function getAverageInvoice(
  invoices: Invoice[]
): number {
  const completed = invoices.filter(
    (invoice) => invoice.status === "completed"
  );

  if (completed.length === 0) {
    return 0;
  }

  const total = completed.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  return total / completed.length;
}