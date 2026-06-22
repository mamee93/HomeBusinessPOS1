import { AnalyticsFilter } from "../types/dateFilter";
import { Invoice } from "../../../types/invoice";

export function filterInvoices(
  invoices: Invoice[],
  filter?: AnalyticsFilter
): Invoice[] {
  if (!filter || filter.period === "all") {
    return invoices;
  }

  const now = new Date();

  return invoices.filter((invoice) => {
    const date = new Date(invoice.createdAt);

    switch (filter.period) {
      case "today":
        return isSameDay(date, now);

      case "week":
        return isSameWeek(date, now);

      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      case "year":
        return (
          date.getFullYear() === now.getFullYear()
        );

      case "custom":
        if (!filter.range) {
          return true;
        }

        const { startDate, endDate } = filter.range;

        if (startDate && date < startDate) {
          return false;
        }

        if (endDate && date > endDate) {
          return false;
        }

        return true;

      default:
        return true;
    }
  });
}

function isSameDay(
  a: Date,
  b: Date
) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function isSameWeek(
  a: Date,
  b: Date
) {
  const start = new Date(b);

  start.setDate(
    b.getDate() - b.getDay()
  );

  start.setHours(0, 0, 0, 0);

  const end = new Date(start);

  end.setDate(start.getDate() + 7);

  return a >= start && a < end;
}