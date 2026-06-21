import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard, AppText } from "@/components/ui";
import { Spacing } from "@/theme";

interface Props {
  itemsCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export default function CartSummary({
  itemsCount,
  subtotal,
  discount,
  tax,
  total,
}: Props) {
  return (
    <AppCard style={styles.card}>
      <Row
        label="عدد الأصناف"
        value={itemsCount.toString()}
      />

      <Row
        label="المجموع"
        value={`${subtotal.toFixed(3)} ر.ع`}
      />

      <Row
        label="الخصم"
        value={`${discount.toFixed(3)} ر.ع`}
      />

      <Row
        label="الضريبة"
        value={`${tax.toFixed(3)} ر.ع`}
      />

      <View style={styles.divider} />

      <Row
        label="الإجمالي"
        value={`${total.toFixed(3)} ر.ع`}
        bold
      />
    </AppCard>
  );
}

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
}

function Row({
  label,
  value,
  bold = false,
}: RowProps) {
  return (
    <View style={styles.row}>
      <AppText weight={bold ? "700" : "400"}>
        {label}
      </AppText>

      <AppText weight={bold ? "700" : "400"}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: Spacing.md,
  },
});