import React from "react";
import { StyleSheet } from "react-native";

import { AppCard, AppText } from "../../../components/ui";
import { Theme } from "../../../theme";

interface Props {
  count: number;
}

export default function LowStockCard({
  count,
}: Props) {
  return (
    <AppCard style={styles.card}>
      <AppText variant="bodySmall">
        Low Stock Products
      </AppText>

      <AppText
        variant="h2"
        color={Theme.colors.warning}
      >
        {count}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Theme.spacing.lg,
  },
});