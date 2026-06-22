import { Invoice } from "../../../types/invoice";

import { DateFilter } from "../components/InvoiceDateFilter";

export function filterByDate(
  invoices: Invoice[],
  filter: DateFilter
) {
  if (filter === "all") {
    return invoices;
  }

  const now = new Date();

  return invoices.filter((invoice) => {
    const date =
      new Date(invoice.createdAt);

    switch (filter) {
      case "today":
        return (
          date.toDateString() ===
          now.toDateString()
        );

      case "week": {
        const diff =
          now.getTime() -
          date.getTime();

        return (
          diff <=
          7 *
            24 *
            60 *
            60 *
            1000
        );
      }

      case "month":
        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      default:
        return true;
    }
  });
}