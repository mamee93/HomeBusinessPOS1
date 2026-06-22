import React from "react";
import {StyleSheet,View,} from "react-native";
import {AppCard, AppText,} from "../../../components/ui";
import {Colors,Spacing,} from "../../../theme";
import { Invoice } from "../../../types/invoice";

interface Props {
  invoices: Invoice[];
}
 

export default function InvoiceStats({
  invoices,
}: Props) {
  const totalInvoices =
    invoices.length;

  const completed =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "completed"
    ).length;

  const cancelled =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "cancelled"
    ).length;

  const totalSales =
    invoices
      .filter(
        (invoice) =>
          invoice.status ===
          "completed"
      )
      .reduce(
        (sum, invoice) =>
          sum + invoice.total,
        0
      );

  return (
    <View style={styles.grid}>
      <StatCard
  title="الفواتير"
  value={totalInvoices.toString()}
  icon="🧾"
  color={Colors.primary}
/>

    <StatCard
  title="المكتملة"
  value={completed.toString()}
  icon="🟢"
  color={Colors.success}
/>

  <StatCard
  title="الملغاة"
  value={cancelled.toString()}
  icon="🔴"
  color={Colors.danger}
/>
<StatCard
  title="المبيعات"
  value={`${totalSales.toFixed(3)} ر.ع`}
  icon="💰"
  color={Colors.warning}
/>
    </View>
  );
}

 
interface StatCardProps {
  title: string;

  value: string;

  icon: string;

  color: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps): React.JSX.Element {
  return (
    <AppCard style={styles.card}>
      <AppText
        variant="caption"
        color={color}
      >
        {icon} {title}
      </AppText>

      <AppText
        variant="h3"
        weight="700"
      >
        {value}
      </AppText>
    </AppCard>
  );
}
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },

  card: {
    width: "48%",
    marginBottom: Spacing.md,
    alignItems: "center",
  },
});