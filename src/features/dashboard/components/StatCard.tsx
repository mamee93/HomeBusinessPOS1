import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard, AppText } from "../../../components/ui";
import { Theme } from "../../../theme";

interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <AppCard style={styles.card}>
      <AppText
        variant="bodySmall"
        color={Theme.colors.textSecondary}
      >
        {title}
      </AppText>

      <View style={styles.space} />

      <AppText variant="h3">
        {value}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
    justifyContent: "center",
  },

  space: {
    height: 8,
  },
});