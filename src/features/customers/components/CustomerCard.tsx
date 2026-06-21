import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppText,
} from "../../../components/ui";

import { Customer } from "../../../types/customer";

import { Spacing } from "../../../theme";

interface Props {
  customer: Customer;

  onEdit?: () => void;

  onDelete?: () => void;
}

export default function CustomerCard({
  customer,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AppCard style={styles.card}>
      <AppText
        variant="h4"
        weight="700"
      >
        {customer.name}
      </AppText>

      <AppText>
        📞 {customer.phone}
      </AppText>

      {!!customer.email && (
        <AppText>
          ✉️ {customer.email}
        </AppText>
      )}

      {!!customer.address && (
        <AppText>
          📍 {customer.address}
        </AppText>
      )}

      <View style={styles.footer}>
        <AppBadge
          label={
            customer.isActive
              ? "نشط"
              : "غير نشط"
          }
          variant={
            customer.isActive
              ? "success"
              : "danger"
          }
        />

        <View style={styles.actions}>
          <AppButton
            title="تعديل"
            size="small"
            variant="outline"
            onPress={onEdit}
          />

          <AppButton
            title="حذف"
            size="small"
            variant="danger"
            onPress={onDelete}
          />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },

  footer: {
    marginTop: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
});