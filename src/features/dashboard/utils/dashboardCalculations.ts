import { Invoice } from "../../../types/invoice";
import { Product } from "../../../types/product";
import { TopProduct } from "../types/dashboard";
export function calculateTodaySales(
  invoices: Invoice[]
): number {
  const today = new Date();

  return invoices
    .filter((invoice) => {
      const date = new Date(invoice.createdAt);

      return (
        invoice.status === "completed" &&
        date.toDateString() === today.toDateString()
      );
    })
    .reduce(
      (sum, invoice) => sum + invoice.total,
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
        now.getTime() - date.getTime();

      return (
        invoice.status === "completed" &&
        diff <=
          7 * 24 * 60 * 60 * 1000
      );
    })
    .reduce(
      (sum, invoice) => sum + invoice.total,
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
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    })
    .reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );
}

export function getLowStockProducts(
  products: Product[]
): Product[] {
  return products.filter(
    (product) =>
      product.stock <= product.minStock
  );
}
export function getTopProducts(
  invoices: Invoice[]
): TopProduct[] {
  const map = new Map<
    string,
    TopProduct
  >();

  invoices
    .filter(
      (invoice) =>
        invoice.status ===
        "completed"
    )
    .forEach((invoice) => {
      invoice.items.forEach((item) => {
        const current =
          map.get(item.productId);

        if (current) {
          current.quantity +=
            item.quantity;

          current.total +=
            item.total;
        } else {
          map.set(
            item.productId,
            {
              productId:
                item.productId,

              productName:
                item.productName,

              quantity:
                item.quantity,

              total: item.total,
            }
          );
        }
      });
    });

  return [...map.values()]
    .sort(
      (a, b) =>
        b.quantity -
        a.quantity
    )
    .slice(0, 5);
}