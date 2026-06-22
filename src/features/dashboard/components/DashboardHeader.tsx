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

export default function DashboardHeader() {
  const now = new Date();

  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "🌞 صباح الخير"
      : hour < 18
      ? "☀️ مساء الخير"
      : "🌙 مساء الخير";

  const date =
    now.toLocaleDateString("ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <AppCard style={styles.card}>
      <View>

        <AppText
          variant="h2"
          weight="700"
        >
          {greeting}
        </AppText>

        <AppText
          color={Colors.textSecondary}
        >
          {date}
        </AppText>

      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
  },
});