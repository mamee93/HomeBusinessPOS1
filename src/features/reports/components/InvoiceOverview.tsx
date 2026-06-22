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
  total: number;
  completed: number;
  cancelled: number;
  draft: number;
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
        {value}
      </AppText>
    </AppCard>
  );
}

export default function InvoiceOverview({
  total,
  completed,
  cancelled,
  draft,
}: Props) {
  return (
    <View style={styles.container}>
      <Stat
        title="إجمالي الفواتير"
        value={total}
      />

      <Stat
        title="المكتملة"
        value={completed}
      />

      <Stat
        title="الملغاة"
        value={cancelled}
      />

      <Stat
        title="المسودات"
        value={draft}
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