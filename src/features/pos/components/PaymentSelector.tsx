import React from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui";

import { PaymentMethod } from "@/types/invoice";
import { Spacing } from "@/theme";

interface Props {
  value: PaymentMethod;
  onChange: (
    method: PaymentMethod
  ) => void;
}

export default function PaymentSelector({
  value,
  onChange,
}: Props) {
  const methods: {
    value: PaymentMethod;
    title: string;
  }[] = [
    {
      value: "cash",
      title: "💵 نقد",
    },
    {
      value: "card",
      title: "💳 بطاقة",
    },
    {
      value: "bank",
      title: "🏦 تحويل",
    },
    {
      value: "mixed",
      title: "🔀 مختلط",
    },
  ];

  return (
    <View style={styles.container}>
      {methods.map((method) => (
        <AppButton
          key={method.value}
          title={method.title}
          variant={
            value === method.value
              ? "primary"
              : "outline"
          }
          onPress={() =>
            onChange(method.value)
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
});