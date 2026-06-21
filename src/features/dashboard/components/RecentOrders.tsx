import React from "react";
import { StyleSheet, View } from "react-native";

import { AppCard, AppText } from "../../../components/ui";
import { Theme } from "../../../theme";

export default function RecentOrders() {
  return (
    <AppCard style={styles.card}>
      <AppText variant="h4">
        Recent Orders
      </AppText>

      <View style={styles.empty}>
        <AppText color={Theme.colors.textSecondary}>
          No orders yet.
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Theme.spacing.lg,
  },

  empty: {
    paddingVertical: Theme.spacing.xl,
    alignItems: "center",
  },
});