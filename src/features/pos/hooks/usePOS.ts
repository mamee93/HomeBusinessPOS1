import { useMemo, useState } from "react";

import { Product } from "@/types/product";
import { PaymentMethod } from "@/types/invoice";

import { CartItem } from "../types";
import posService from "../services/posService";

export default function usePOS() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerId, setCustomerId] =
    useState<string>();

  const [customerName, setCustomerName] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [discount, setDiscount] =
    useState(0);

  const [tax, setTax] =
    useState(0);

  const [notes, setNotes] =
    useState("");

  const addProduct = (
    product: Product
  ) => {
    setCart((prev) =>
      posService.addProduct(
        prev,
        product
      )
    );
  };

  const removeProduct = (
    productId: string
  ) => {
    setCart((prev) =>
      posService.removeProduct(
        prev,
        productId
      )
    );
  };

  const increase = (
    productId: string
  ) => {
    setCart((prev) =>
      posService.increaseQuantity(
        prev,
        productId
      )
    );
  };

  const decrease = (
    productId: string
  ) => {
    setCart((prev) =>
      posService.decreaseQuantity(
        prev,
        productId
      )
    );
  };

  const clear = () => {
    setCart([]);
    setCustomerId(undefined);
    setCustomerName("");
    setDiscount(0);
    setTax(0);
    setNotes("");
    setPaymentMethod("cash");
  };

  const subtotal = useMemo(
    () =>
      posService.subtotal(cart),
    [cart]
  );

  const total = useMemo(
    () =>
      posService.total(
        cart,
        discount,
        tax
      ),
    [cart, discount, tax]
  );

  const itemsCount = useMemo(
    () =>
      posService.itemsCount(cart),
    [cart]
  );

  return {
    cart,

    customerId,
    customerName,

    paymentMethod,

    discount,
    tax,

    notes,

    subtotal,
    total,

    itemsCount,

    setCustomerId,
    setCustomerName,

    setPaymentMethod,

    setDiscount,
    setTax,

    setNotes,

    addProduct,
    removeProduct,

    increase,
    decrease,

    clear,
  };
}