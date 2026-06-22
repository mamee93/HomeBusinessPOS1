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
  today: number;
  week: number;
  month: number;
  year: number;
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

export default function SalesOverview({
  today,
  week,
  month,
  year,
}: Props) {
  return (
    <View style={styles.container}>
      <Stat
        title="اليوم"
        value={today}
      />

      <Stat
        title="الأسبوع"
        value={week}
      />

      <Stat
        title="الشهر"
        value={month}
      />

      <Stat
        title="السنة"
        value={year}
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