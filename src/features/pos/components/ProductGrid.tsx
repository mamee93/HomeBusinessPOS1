import React from "react";

import { AppList } from "../../../components/ui";

import { Product } from "../../../types/product";

import ProductTile from "./ProductTile";

interface Props {
  products: Product[];

  loading?: boolean;

  onSelect: (product: Product) => void;
}

export default function ProductGrid({
  products,
  loading = false,
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
          onPress={() => onSelect(item)}
        />
      )}
    />
  );
}