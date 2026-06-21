import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppCard,
  AppEmptyState,
  AppList,
  AppText,
} from "../../../components/ui";

import { Spacing } from "../../../theme";

import { CartItem as CartItemModel } from "../types";

import CartItem from "./CartItem";

interface Props {
  items: CartItemModel[];

  onIncrease: (id: string) => void;

  onDecrease: (id: string) => void;

  onRemove: (id: string) => void;
}

export default function Cart({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <AppCard style={styles.container}>
      <AppText
        variant="h3"
        weight="700"
      >
        السلة
      </AppText>

      {items.length === 0 ? (
        <AppEmptyState
          title="السلة فارغة"
          description="ابدأ بإضافة منتجات."
        />
      ) : (
        <AppList
          data={items}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={() =>
                onIncrease(item.product.id)
              }
              onDecrease={() =>
                onDecrease(item.product.id)
              }
              onRemove={() =>
                onRemove(item.product.id)
              }
            />
          )}
        />
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Spacing.lg,
  },
});