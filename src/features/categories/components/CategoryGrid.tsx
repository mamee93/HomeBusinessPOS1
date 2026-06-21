import React from "react";
import { FlatList } from "react-native";

import CategoryCard from "./CategoryCard";

import { Category } from "../../../types/category";

interface Props {
  categories: Category[];
  onPress?: (category: Category) => void;
}

export default function CategoryGrid({
  categories,
  onPress,
}: Props) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => onPress?.(item)}
        />
      )}
    />
  );
}