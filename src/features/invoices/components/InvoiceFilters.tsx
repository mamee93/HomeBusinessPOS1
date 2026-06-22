import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  AppChip,
} from "../../../components/ui";

import {
  InvoiceStatus,
} from "../../../types/invoice";

import { Spacing } from "../../../theme";

interface Props {
  selected: InvoiceStatus | "all";

  onSelect: (
    status: InvoiceStatus | "all"
  ) => void;
}

export default function InvoiceFilters({
  selected,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <AppChip
        label="الكل"
        selected={selected === "all"}
        onPress={() => onSelect("all")}
      />

      <AppChip
        label="مكتملة"
        selected={
          selected === "completed"
        }
        onPress={() =>
          onSelect("completed")
        }
      />

      <AppChip
        label="ملغاة"
        selected={
          selected === "cancelled"
        }
        onPress={() =>
          onSelect("cancelled")
        }
      />

      <AppChip
        label="مسودة"
        selected={
          selected === "draft"
        }
        onPress={() =>
          onSelect("draft")
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