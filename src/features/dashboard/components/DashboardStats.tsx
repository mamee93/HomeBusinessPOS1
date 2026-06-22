import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import {
  AppCard,
  AppText,
} from "../../../components/ui";

import {
  Colors,
  Spacing,
} from "../../../theme";

interface Props {
  todaySales: number;

  weekSales: number;

  monthSales: number;

  lowStockCount: number;
}

export default function DashboardStats({
  todaySales,
  weekSales,
  monthSales,
  lowStockCount,
}: Props) {
  return (
    <View style={styles.grid}>

      <StatCard
        icon="💰"
        title="اليوم"
        value={`${todaySales.toFixed(3)} ر.ع`}
        color={Colors.success}
      />

      <StatCard
        icon="📈"
        title="الأسبوع"
        value={`${weekSales.toFixed(3)} ر.ع`}
        color={Colors.primary}
      />

      <StatCard
        icon="📊"
        title="الشهر"
        value={`${monthSales.toFixed(3)} ر.ع`}
        color={Colors.warning}
      />

      <StatCard
        icon="📦"
        title="منخفض المخزون"
        value={`${lowStockCount}`}
        color={Colors.danger}
      />

    </View>
  );
}

interface StatCardProps {
  icon: string;

  title: string;

  value: string;

  color: string;
}

function StatCard({
  icon,
  title,
  value,
  color,
}: StatCardProps) {
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
  },

  card: {
    width: "48%",
    marginBottom: Spacing.md,
    alignItems: "center",
  },
});