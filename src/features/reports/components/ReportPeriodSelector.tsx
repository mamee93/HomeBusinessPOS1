import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  AppChip,
} from "../../../components/ui";

import { AnalyticsPeriod } from "../../../core/analytics/types/dateFilter";

interface Props {
  value: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
}

const periods: {
  label: string;
  value: AnalyticsPeriod;
}[] = [
  {
    label: "اليوم",
    value: "today",
  },
  {
    label: "الأسبوع",
    value: "week",
  },
  {
    label: "الشهر",
    value: "month",
  },
  {
    label: "السنة",
    value: "year",
  },
  {
    label: "الكل",
    value: "all",
  },
];

export default function ReportPeriodSelector({
  value,
  onChange,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {periods.map((item) => (
        <AppChip
          key={item.value}
          label={item.label}
          selected={value === item.value}
          onPress={() =>
            onChange(item.value)
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 4,
  },
});