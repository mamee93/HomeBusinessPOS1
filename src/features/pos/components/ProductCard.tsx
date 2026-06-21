import React from "react";
import { StyleSheet } from "react-native";

import { Product } from "../../../types/product";

import { AppList } from "../../../components/ui";

import ProductCard from "../../products/components/ProductCard";

interface Props {
  products: Product[];

  onSelect: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onSelect,
}: Props) {
  return (
    <AppList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => onSelect(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
});