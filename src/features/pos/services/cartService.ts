 import { Product } from "../../../types/product";
import { CartItem, CartState } from "../types/cart";
import {calculateCartTotals,calculateItemTotal,} from "../utils/calculations";

 

export function createEmptyCart(): CartState {
  return {
    items: [],
    totals: calculateCartTotals([]),
  };
}

export function addToCart(
  cart: CartState,
  product: Product
): CartState {
  const existingItem = cart.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem && existingItem.quantity >= product.stock) {
    return cart;
  }

  let items: CartItem[];

  if (existingItem) {
    items = cart.items.map((item) => {
      if (item.product.id !== product.id) {
        return item;
      }

      const quantity = item.quantity + 1;

      return {
        ...item,
        quantity,
        totalPrice: calculateItemTotal(
          item.unitPrice,
          quantity
        ),
      };
    });
  } else {
    items = [
      ...cart.items,
      {
        product,
        quantity: 1,
        unitPrice: product.sellingPrice,
        totalPrice: calculateItemTotal(
          product.sellingPrice,
          1
        ),
      },
    ];
  }

  return {
    items,
    totals: calculateCartTotals(items),
  };
}

export function increaseQuantity(
  cart: CartState,
  productId: string
): CartState {
  const items = cart.items.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }

    if (item.quantity >= item.product.stock) {
      return item;
    }

    const quantity = item.quantity + 1;

    return {
      ...item,
      quantity,
      totalPrice: calculateItemTotal(
        item.unitPrice,
        quantity
      ),
    };
  });

  return {
    items,
    totals: calculateCartTotals(items),
  };
}

export function decreaseQuantity(
  cart: CartState,
  productId: string
): CartState {
  const items = cart.items
    .map((item) => {
      if (item.product.id !== productId) {
        return item;
      }

      const quantity = item.quantity - 1;

      if (quantity <= 0) {
        return null;
      }

      return {
        ...item,
        quantity,
        totalPrice: calculateItemTotal(
          item.unitPrice,
          quantity
        ),
      };
    })
    .filter((item): item is CartItem => item !== null);

  return {
    items,
    totals: calculateCartTotals(items),
  };
}

export function removeFromCart(
  cart: CartState,
  productId: string
): CartState {
  const items = cart.items.filter(
    (item) => item.product.id !== productId
  );

  return {
    items,
    totals: calculateCartTotals(items),
  };
}

export function clearCart(): CartState {
  return createEmptyCart();
}

export function isProductInCart(
  cart: CartState,
  productId: string
): boolean {
  return cart.items.some(
    (item) => item.product.id === productId
  );
}

export function getCartItem(
  cart: CartState,
  productId: string
): CartItem | undefined {
  return cart.items.find(
    (item) => item.product.id === productId
  );
}

export function getCartQuantity(
  cart: CartState,
  productId: string
): number {
  return (
    cart.items.find(
      (item) => item.product.id === productId
    )?.quantity ?? 0
  );
}

export function getRemainingStock(
  cart: CartState,
  productId: string
): number {
  const item = cart.items.find(
    (cartItem) => cartItem.product.id === productId
  );

  if (!item) {
    return 0;
  }

  return item.product.stock - item.quantity;
}