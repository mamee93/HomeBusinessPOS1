import { CartItem } from "../types";
import { Product } from "@/types/product";

class POSService {
  addProduct(
    cart: CartItem[],
    product: Product
  ): CartItem[] {
    const index = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (index === -1) {
      return [
        ...cart,
        {
          product,
          quantity: 1,
          subtotal: product.sellingPrice,
        },
      ];
    }

    return cart.map((item) => {
      if (item.product.id !== product.id) {
        return item;
      }

      const quantity = item.quantity + 1;

      return {
        ...item,
        quantity,
        subtotal:
          quantity *
          item.product.sellingPrice,
      };
    });
  }

  removeProduct(
    cart: CartItem[],
    productId: string
  ): CartItem[] {
    return cart.filter(
      (item) =>
        item.product.id !== productId
    );
  }

  increaseQuantity(
    cart: CartItem[],
    productId: string
  ): CartItem[] {
    return cart.map((item) => {
      if (item.product.id !== productId) {
        return item;
      }

      const quantity = item.quantity + 1;

      return {
        ...item,
        quantity,
        subtotal:
          quantity *
          item.product.sellingPrice,
      };
    });
  }

  decreaseQuantity(
    cart: CartItem[],
    productId: string
  ): CartItem[] {
    return cart
      .map((item) => {
        if (
          item.product.id !== productId
        ) {
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
      );
  }

  clear(): CartItem[] {
    return [];
  }

  subtotal(
    cart: CartItem[]
  ): number {
    return cart.reduce(
      (sum, item) =>
        sum + item.subtotal,
      0
    );
  }

  discount(
    subtotal: number,
    discount: number
  ): number {
    if (discount <= 0) {
      return subtotal;
    }

    return subtotal - discount;
  }

  tax(
    amount: number,
    tax: number
  ): number {
    if (tax <= 0) {
      return amount;
    }

    return amount + tax;
  }

  total(
    cart: CartItem[],
    discount: number,
    tax: number
  ): number {
    const subtotal =
      this.subtotal(cart);

    const afterDiscount =
      this.discount(
        subtotal,
        discount
      );

    return this.tax(
      afterDiscount,
      tax
    );
  }

  itemsCount(
    cart: CartItem[]
  ): number {
    return cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );
  }
}

export default new POSService();