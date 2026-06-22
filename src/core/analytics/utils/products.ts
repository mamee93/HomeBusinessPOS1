import { Invoice } from "../../../types/invoice";
import { Product } from "../../../types/product";

import {
  TopProduct,
} from "../types/analytics";

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
        invoice.status === "completed"
    )
    .forEach((invoice) => {
      invoice.items.forEach((item) => {
        const current = map.get(
          item.productId
        );

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
        b.quantity - a.quantity
    )
    .slice(0, 5);
}