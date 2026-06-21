import { useMemo, useState } from "react";

import { Product } from "../../../types/product";
import { CartItem } from "../types";

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const index = current.findIndex(
        (item) => item.product.id === product.id
      );

      if (index === -1) {
        return [
          ...current,
          {
            product,
            quantity: 1,
            subtotal: product.sellingPrice,
          },
        ];
      }

      const updated = [...current];

      if (
        updated[index].quantity <
        product.stock
      ) {
        const quantity =
          updated[index].quantity + 1;

        updated[index] = {
          ...updated[index],
          quantity,
          subtotal:
            quantity *
            product.sellingPrice,
        };
      }

      return updated;
    });
  };

  const increase = (id: string) => {
    setItems((current) =>
      current.map((item) => {
        if (item.product.id !== id) {
          return item;
        }

        if (
          item.quantity >=
          item.product.stock
        ) {
          return item;
        }

        const quantity =
          item.quantity + 1;

        return {
          ...item,
          quantity,
          subtotal:
            quantity *
            item.product.sellingPrice,
        };
      })
    );
  };

  const decrease = (id: string) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.product.id !== id) {
            return item;
          }

          const quantity =
            item.quantity - 1;

          return {
            ...item,
            quantity,
            subtotal:
              quantity *
              item.product
                .sellingPrice,
          };
        })
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const removeItem = (id: string) => {
    setItems((current) =>
      current.filter(
        (item) =>
          item.product.id !== id
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.subtotal,
      0
    );
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [items]);

  return {
    items,

    subtotal,

    total: subtotal,

    totalItems,

    addItem,

    increase,

    decrease,

    removeItem,

    clearCart,
  };
}