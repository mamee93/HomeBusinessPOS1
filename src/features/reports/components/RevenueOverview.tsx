import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import {
  AppCard,
  AppText,
} from "../../../components/ui";

import { Theme } from "../../../theme";

interface Props {
  revenue: number;
  averageInvoice: number;
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <AppCard style={styles.card}>
      <AppText variant="caption">
        {title}
      </AppText>

      <AppText
        variant="h3"
        weight="700"
      >
        {value.toFixed(2)}
      </AppText>
    </AppCard>
  );
}

export default function RevenueOverview({
  revenue,
  averageInvoice,
}: Props) {
  return (
    <View style={styles.container}>
      <Stat
        title="إجمالي الإيرادات"
        value={revenue}
      />

      <Stat
        title="متوسط الفاتورة"
        value={averageInvoice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },

  card: {
    padding: Theme.spacing.lg,
  },
});