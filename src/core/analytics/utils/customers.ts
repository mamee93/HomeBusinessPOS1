import { Invoice } from "../../../types/invoice";

import {
  TopCustomer,
} from "../types/analytics";

export function getTopCustomers(
  invoices: Invoice[]
): TopCustomer[] {
  const map = new Map<
    string,
    TopCustomer
  >();

  invoices
    .filter(
      (invoice) =>
        invoice.status === "completed"
    )
    .forEach((invoice) => {
      if (!invoice.customerId) {
        return;
      }

      const current = map.get(
        invoice.customerId
      );

      if (current) {
        current.invoices++;

        current.total +=
          invoice.total;
      } else {
        map.set(
          invoice.customerId,
          {
            customerId:
              invoice.customerId,

            customerName:
              invoice.customerName ??
              "عميل",

            invoices: 1,

            total: invoice.total,
          }
        );
      }
    });

  return [...map.values()]
    .sort(
      (a, b) =>
        b.total - a.total
    )
    .slice(0, 5);
}