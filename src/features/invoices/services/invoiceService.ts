 
import productService from "../../products/services/productService";
import {Invoice, InvoiceItem,} from "../../../types/invoice";
import { InvoiceFormData } from "../types";
import storage from "../../../storage/storage";


const STORAGE_KEY = "@homebusinesspos/invoices";

class InvoiceService {
  async getAll(): Promise<Invoice[]> {
    try {
      const data = await storage.get<Invoice[]>(STORAGE_KEY);

      return data ?? [];

    } catch (error) {
      console.error("Failed to load invoices:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Invoice | null> {
    const invoices = await this.getAll();

    return (
      invoices.find((item) => item.id === id) ?? null
    );
  }

  private async saveAll(
    invoices: Invoice[]
  ): Promise<void> {
   await storage.set(
  STORAGE_KEY,
  invoices
);
  }

  private async generateInvoiceNumber(): Promise<string> {
    const invoices = await this.getAll();

    return `INV-${(invoices.length + 1)
      .toString()
      .padStart(6, "0")}`;
  }

  private calculateSubtotal(
    items: InvoiceItem[]
  ): number {
    return items.reduce(
      (sum, item) => sum + item.total,
      0
    );
  }

  async create(
    form: InvoiceFormData,
    items: InvoiceItem[],
    customerName?: string
  ): Promise<Invoice> {
    if (items.length === 0) {
      throw new Error("السلة فارغة");
    }

    for (const item of items) {
      const hasStock =
        await productService.hasStock(
          item.productId,
          item.quantity
        );

      if (!hasStock) {
        throw new Error(
          `${item.productName} لا توجد كمية كافية`
        );
      }
    }

    const invoices = await this.getAll();

    const subtotal =
      this.calculateSubtotal(items);

    const total =
      subtotal -
      form.discount +
      form.tax;

    const now =
      new Date().toISOString();

    const invoice: Invoice = {
      id: Date.now().toString(),

      createdAt: now,

      updatedAt: now,

      invoiceNumber:
        await this.generateInvoiceNumber(),

      customerId:
        form.customerId,

      customerName,

      items,

      subtotal,

      discount:
        form.discount,

      tax:
        form.tax,

      total,

      paymentMethod:
        form.paymentMethod,

      status:
        form.status,

      notes:
        form.notes,
    };

    await productService.updateStocks(
      items.map((item) => ({
        productId:
          item.productId,
        quantity:
          item.quantity,
      }))
    );

    invoices.push(invoice);

    await this.saveAll(invoices);

    return invoice;
  }

  async update(
    id: string,
    data: Partial<Invoice>
  ): Promise<Invoice> {
    const invoices = await this.getAll();

    const index = invoices.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Invoice not found");
    }

    invoices[index] = {
      ...invoices[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await this.saveAll(invoices);

    return invoices[index];
  }

  async delete(id: string): Promise<void> {
    const invoices = await this.getAll();

    const invoice = invoices.find(
      (item) => item.id === id
    );

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (invoice.status !== "cancelled") {
      await productService.restoreStocks(
        invoice.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }))
      );
    }

    await this.saveAll(
      invoices.filter(
        (item) => item.id !== id
      )
    );
  }

  async cancel(
    id: string
  ): Promise<Invoice> {
    const invoices = await this.getAll();

    const index = invoices.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      throw new Error("Invoice not found");
    }

    const invoice = invoices[index];

    if (invoice.status === "cancelled") {
      return invoice;
    }

    await productService.restoreStocks(
      invoice.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))
    );

    invoices[index] = {
      ...invoice,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };

    await this.saveAll(invoices);

    return invoices[index];
  }

  async clear(): Promise<void> {
    await storage.remove(
  STORAGE_KEY
);
  }
}

export default new InvoiceService();