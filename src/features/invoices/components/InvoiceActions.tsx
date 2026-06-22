import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import {
  AppButton,
} from "../../../components/ui";

import { Spacing } from "../../../theme";

interface Props {
  onView: () => void;

  onPrint?: () => void;

  onShare?: () => void;

  onCancel?: () => void;

  cancelled?: boolean;
}

export default function InvoiceActions({
  onView,
  onPrint,
  onShare,
  onCancel,
  cancelled = false,
}: Props) {
  return (
    <View style={styles.container}>

      <AppButton
        title="عرض"
        variant="primary"
        fullWidth={false}
        onPress={onView}
      />

      <AppButton
        title="طباعة"
        variant="outline"
        fullWidth={false}
        onPress={onPrint}
      />

      <AppButton
        title="مشاركة"
        variant="outline"
        fullWidth={false}
        onPress={onShare}
      />

      <AppButton
        title="إلغاء"
        variant="danger"
        fullWidth={false}
        disabled={cancelled}
        onPress={onCancel}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});