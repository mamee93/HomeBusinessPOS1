import React from "react";
import { StyleSheet, View } from "react-native";

import { AppButton, AppCard, AppText } from "@/components/ui";
import { Spacing, Colors} from "@/theme";

import { CartItem as CartItemModel } from "../types";
 
interface Props {
  item: CartItemModel;

  canIncrease: boolean;

  onIncrease: () => void;

  onDecrease: () => void;

  onRemove: () => void;
}

export default function CartItem({
  item,
  canIncrease,
  onIncrease,
  onDecrease,
  onRemove,
}: Props)
 {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <AppText weight="700">
          {item.product.name}
        </AppText>

        <AppText>
          {item.subtotal.toFixed(3)} ر.ع
        </AppText>
      </View>

      <View style={styles.footer}>
        <View style={styles.quantity}>
          <AppButton
            title="-"
            size="small"
            onPress={onDecrease}
          />

          <AppText>
            {item.quantity}
          </AppText>

<AppText
  variant="caption"
  color={
    item.quantity >= item.product.stock
      ? Colors.danger
      : Colors.textSecondary
}
>
  {item.quantity >= item.product.stock
    ? "وصلت للحد الأقصى من المخزون"
    : `المتبقي: ${
        item.product.stock -
        item.quantity
      }`}
</AppText>

<AppButton
  title="+"
  size="small"
  disabled={
    item.quantity >=
    item.product.stock
  }
  onPress={onIncrease}
/>

        </View>

        <AppButton
          title="حذف"
          variant="danger"
          size="small"
          onPress={onRemove}
        />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});