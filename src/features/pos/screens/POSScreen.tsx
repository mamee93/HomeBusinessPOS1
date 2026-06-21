import invoiceService from "../../invoices/services/invoiceService";

import { InvoiceFormData } from "../../invoices/types";
import { InvoiceItem } from "../../../types/invoice";

class POSService {
  async checkout(
    form: InvoiceFormData,
    items: InvoiceItem[],
    customerName?: string
  ) {
    return await invoiceService.create(
      form,
      items,
      customerName
    );
  }
}

export default new POSService();