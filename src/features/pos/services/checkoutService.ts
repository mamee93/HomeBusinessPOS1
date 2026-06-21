import invoiceService from "../../invoices/services/invoiceService";
import productService from "../../products/services/productService";

import { CartItem } from "../types";

import { PaymentMethod } from "../../../types/invoice";

interface CheckoutData {
  cart: CartItem[];

  customerId?: string;

  customerName?: string;

  paymentMethod: PaymentMethod;

  discount: number;

  tax: number;

  notes: string;

 
}

class CheckoutService {
  async checkout(data: CheckoutData) {
    const {
      cart,
      customerId,
      customerName,
      paymentMethod,
      discount,
      tax,
      notes,
       
    } = data;

    if (cart.length === 0) {
      throw new Error("السلة فارغة");
    }

   const invoiceItems = cart.map((item) => ({
  productId: item.product.id,

  productName: item.product.name,

  quantity: item.quantity,

  unitPrice: item.product.sellingPrice,

  costPrice: item.product.costPrice,

  total: item.subtotal,
}));

   const invoice = await invoiceService.create(
  {
    customerId,
    paymentMethod,
    discount,
    tax,
    notes,
    status: "completed",
  },
  invoiceItems,
  customerName
);

   
    return invoice;
  }
}

export default new CheckoutService();