import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppButton,
  AppCard,
  AppDivider,
  AppText,
} from "../../../components/ui";

import { Spacing } from "../../../theme";

interface Props {
  totalItems: number;

  subtotal: number;

  total: number;

  onCheckout: () => void;

  onClearCart: () => void;
}

export default function OrderSummary({
  totalItems,
  subtotal,
  total,
  onCheckout,
  onClearCart,
}: Props) {
  return (
    <AppCard style={styles.container}>
      <AppText
        variant="h3"
        weight="700"
      >
        ملخص الطلب
      </AppText>

      <View style={styles.row}>
        <AppText>عدد المنتجات</AppText>

        <AppText weight="700">
          {totalItems}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText>المجموع الفرعي</AppText>

        <AppText weight="700">
          {subtotal.toFixed(3)} ر.ع
        </AppText>
      </View>

      <AppDivider />

      <View style={styles.row}>
        <AppText
          variant="h4"
          weight="700"
        >
          الإجمالي
        </AppText>

        <AppText
          variant="h4"
          weight="700"
        >
          {total.toFixed(3)} ر.ع
        </AppText>
      </View>

      <AppButton
        title="إتمام البيع"
        onPress={onCheckout}
      />

      <View style={styles.spacing} />

      <AppButton
        title="إفراغ السلة"
        variant="outline"
        onPress={onClearCart}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Spacing.sm,
  },

  spacing: {
    height: Spacing.md,
  },
});