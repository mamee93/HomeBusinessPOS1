import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppBadge,
  AppCard,
  AppText,
} from "../../../components/ui";

import { Invoice } from "../../../types/invoice";
import { Spacing,Colors } from "../../../theme";

interface Props {
  invoice: Invoice;
  onPress?: () => void;
}

export default function InvoiceCard({
  invoice,
  onPress,
}: Props) {


  const statusLabel =
  invoice.status === "completed"
    ? "مكتملة"
    : invoice.status === "cancelled"
    ? "ملغاة"
    : "مسودة";

const paymentLabel =
  invoice.paymentMethod === "cash"
    ? "نقداً"
    : invoice.paymentMethod === "card"
    ? "بطاقة"
    : invoice.paymentMethod === "bank"
    ? "تحويل"
    : "مختلط";

  return (
  <AppCard
  style={styles.card}
  onPress={onPress}
>
  <View style={styles.header}>

    <View>
      <AppText
        variant="h4"
        weight="700"
      >
        {invoice.invoiceNumber}
      </AppText>

      <AppText
        variant="caption"
        color={Colors.textSecondary}
      >
        👤 {invoice.customerName || "عميل نقدي"}
      </AppText>
    </View>

    <AppBadge
      label={statusLabel}
      variant={
        invoice.status === "completed"
          ? "success"
          : invoice.status === "cancelled"
          ? "danger"
          : "warning"
      }
    />

  </View>

  <View style={styles.infoRow}>

    <AppText
      variant="caption"
      color={Colors.textSecondary}
    >
      💳 {paymentLabel}
    </AppText>

    <AppText
      variant="caption"
      color={Colors.textSecondary}
    >
      🧾 {invoice.items.length} أصناف
    </AppText>

  </View>

  <View style={styles.infoRow}>

    <AppText
      variant="caption"
      color={Colors.textSecondary}
    >
      📅 {new Date(invoice.createdAt).toLocaleDateString()}
    </AppText>

    <AppText
      variant="h4"
      weight="700"
    >
      {invoice.total.toFixed(3)} ر.ع
    </AppText>

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
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: Spacing.md,
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: Spacing.md,
},
});