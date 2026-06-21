import { v4 as uuid } from "uuid";

import {
  addSale,
  generateInvoiceNumber,
} from "../../../storage/sales";

import {
  getProducts,
  saveProducts,
} from "../../../storage/products";

import {
  CheckoutRequest,
  CheckoutResult,
  Sale,
} from "../types/sale";

export async function checkout(
  request: CheckoutRequest
): Promise<CheckoutResult> {
  try {
    const products = await getProducts();

    // التحقق من المخزون
    for (const item of request.items) {
      const product = products.find(
        (p) => p.id === item.product.id
      );

      if (!product) {
        return {
          success: false,
          message: `المنتج ${item.product.name} غير موجود.`,
        };
      }

      if (product.stock < item.quantity) {
        return {
          success: false,
          message: `المخزون غير كافٍ للمنتج ${product.name}.`,
        };
      }
    }

    // تحديث المخزون
    const updatedProducts = products.map((product) => {
      const cartItem = request.items.find(
        (item) => item.product.id === product.id
      );

      if (!cartItem) {
        return product;
      }

      return {
        ...product,
        stock: product.stock - cartItem.quantity,
      };
    });

    await saveProducts(updatedProducts);

    const subtotal = request.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const discount = request.discount ?? 0;

    const tax = request.tax ?? 0;

    const total = subtotal - discount + tax;

    const sale: Sale = {
      id: uuid(),

      invoiceNumber:
        await generateInvoiceNumber(),

      items: request.items,

      subtotal,

      discount,

      tax,

      total,

      paymentMethod:
        request.paymentMethod,

      status: "completed",

      customerId: request.customerId,

      notes: request.notes,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    await addSale(sale);

    return {
      success: true,
      sale,
      message: "تمت عملية البيع بنجاح.",
    };
  } catch {
    return {
      success: false,
      message: "حدث خطأ أثناء إتمام عملية البيع.",
    };
  }
}