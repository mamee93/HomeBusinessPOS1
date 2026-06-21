import React from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";

import { AppText } from "../../../components/ui";
import { Colors, Radius, Spacing } from "../../../theme";

import { Category } from "../../../types/category";

interface Props {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <CategoryButton
        title="الكل"
        active={selectedCategoryId === null}
        onPress={() => onSelect(null)}
      />

      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          title={category.name}
          active={selectedCategoryId === category.id}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </ScrollView>
  );
}

interface ButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

function CategoryButton({
  title,
  active,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        active && styles.activeButton,
      ]}
    >
      <AppText
        weight="600"
        color={
          active
            ? Colors.surface
            : Colors.text
        }
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },

  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  activeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});