import React from "react";

import { AppList } from "../../../components/ui";

import { Product } from "../../../types/product";

import ProductTile from "./ProductTile";

interface Props {
  products: Product[];

  loading?: boolean;

  cart: {
    product: Product;
    quantity: number;
  }[];

  onSelect: (product: Product) => void;
}

export default function ProductGrid({
  products,
  loading = false,
  cart,
  onSelect,
}: Props) {
  return (
    <AppList
      data={products}
      loading={loading}
      numColumns={2}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      renderItem={({ item }) => (


        <ProductTile
  product={item}
  cartQuantity={
    cart.find(
      (cartItem) =>
        cartItem.product.id === item.id
    )?.quantity ?? 0
  }
  onPress={() => onSelect(item)}
/>


      )}
    />
  );
}