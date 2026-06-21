import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppBadge,
  AppCard,
  AppText,
} from "../../../components/ui";

import { Invoice } from "../../../types/invoice";
import { Spacing } from "../../../theme";

interface Props {
  invoice: Invoice;
  onPress?: () => void;
}

export default function InvoiceCard({
  invoice,
  onPress,
}: Props) {
  return (
    <AppCard
      style={styles.card}
    >
      <AppText
        variant="h4"
        weight="700"
      >
        {invoice.invoiceNumber}
      </AppText>

      <AppText>
        {new Date(
          invoice.createdAt
        ).toLocaleString()}
      </AppText>

      <AppText>
        عدد الأصناف: {invoice.items.length}
      </AppText>

      <AppText
        weight="700"
      >
        {invoice.total.toFixed(3)} ر.ع
      </AppText>

      <View style={styles.footer}>
        <AppBadge
          label={invoice.status}
          variant={
            invoice.status === "completed"
              ? "success"
              : invoice.status === "cancelled"
              ? "danger"
              : "warning"
          }
        />
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
  },
});