import React from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "../../../components/ui";
import { Theme } from "../../../theme";

interface ProductActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductActions({
  onEdit,
  onDelete,
}: ProductActionsProps) {
  return (
    <View style={styles.container}>
      <AppButton
        title="تعديل المنتج"
        onPress={onEdit}
      />

      <View style={styles.space} />

      <AppButton
        title="حذف المنتج"
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.xl,
  },

  space: {
    height: Theme.spacing.md,
  },
});