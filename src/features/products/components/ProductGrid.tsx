import React from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";

import ProductCard from "./ProductCard";

import { Product } from "../../../types/product";
import { Theme } from "../../../theme";

interface Props {
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onProductPress,
}: Props) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => onProductPress?.(item)}
        />
      )}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Theme.spacing.xxl,
  },
});