import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard, AppText } from "../../../components/ui";
import { Theme } from "../../../theme";
import { Category } from "../../../types/category";

interface Props {
  category: Category;
  productsCount?: number;
  onPress?: () => void;
}

export default function CategoryCard({
  category,
  productsCount = 0,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <AppCard style={styles.card}>
        <View style={styles.header}>
          <View
            style={[
              styles.color,
              {
                backgroundColor: category.color,
              },
            ]}
          />

          <AppText variant="h4">
            {category.name}
          </AppText>
        </View>

        <AppText color={Theme.colors.textSecondary}>
          عدد المنتجات: {productsCount}
        </AppText>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },

  color: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: Theme.spacing.sm,
  },
});