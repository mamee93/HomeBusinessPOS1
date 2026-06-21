import invoiceService from "../../invoices/services/invoiceService";

import { InvoiceFormData } from "../../invoices/types";
import { InvoiceItem } from "../../../types/invoice";

class POSService {
  await invoiceService.create(
  {
    customerId,
    discount,
    tax,
    paymentMethod,
    status: "completed",
    notes,
  },
  cart.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.sellingPrice,
    costPrice: item.product.costPrice,
    total: item.subtotal,
  })),
  customerName
);
  }
}

export default new POSService();