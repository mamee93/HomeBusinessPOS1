import { Invoice } from "../../../types/invoice";

export function calculateTodaySales(
  invoices: Invoice[]
): number {
  const today = new Date();

  return invoices
    .filter((invoice) => {
      const date = new Date(invoice.createdAt);

      return (
        invoice.status === "completed" &&
        date.toDateString() ===
          today.toDateString()
      );
    })
    .reduce(
      (sum, invoice) =>
        sum + invoice.total,
      0
    );
}

export function calculateWeekSales(
  invoices: Invoice[]
): number {
  const now = new Date();

  return invoices
    .filter((invoice) => {
      const date = new Date(invoice.createdAt);

      const diff =
        now.getTime() -
        date.getTime();

      return (
        invoice.status === "completed" &&
        diff <=
          7 * 24 * 60 * 60 * 1000
      );
    })
    .reduce(
      (sum, invoice) =>
        sum + invoice.total,
      0
    );
}

export function calculateMonthSales(
  invoices: Invoice[]
): number {
  const now = new Date();

  return invoices
    .filter((invoice) => {
      const date = new Date(invoice.createdAt);

      return (
        invoice.status === "completed" &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    })
    .reduce(
      (sum, invoice) =>
        sum + invoice.total,
      0
    );
}

export function calculateRevenue(
  invoices: Invoice[]
): number {
  return invoices
    .filter(
      (invoice) =>
        invoice.status === "completed"
    )
    .reduce(
      (sum, invoice) =>
        sum + invoice.total,
      0
    );
}

export function calculateYearSales(invoices: Invoice[]) {
  const year = new Date().getFullYear();

  return invoices
    .filter((invoice) => {
      const date = new Date(invoice.createdAt);

      return (
        date.getFullYear() === year &&
        invoice.status === "completed"
      );
    })
    .reduce(
      (total, invoice) => total + invoice.total,
      0
    );
}