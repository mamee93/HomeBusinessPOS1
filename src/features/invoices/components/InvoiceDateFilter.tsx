import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { AppChip } from "../../../components/ui";
import { Spacing } from "../../../theme";

export type DateFilter =
  | "all"
  | "today"
  | "week"
  | "month";

interface Props {
  value: DateFilter;

  onChange: (
    value: DateFilter
  ) => void;
}

export default function InvoiceDateFilter({
  value,
  onChange,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <AppChip
        label="الكل"
        selected={value === "all"}
        onPress={() => onChange("all")}
      />

      <AppChip
        label="اليوم"
        selected={value === "today"}
        onPress={() =>
          onChange("today")
        }
      />

      <AppChip
        label="هذا الأسبوع"
        selected={value === "week"}
        onPress={() =>
          onChange("week")
        }
      />

      <AppChip
        label="هذا الشهر"
        selected={value === "month"}
        onPress={() =>
          onChange("month")
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
});