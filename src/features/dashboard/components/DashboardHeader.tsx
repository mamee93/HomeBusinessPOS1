import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "../../../components/ui";
import { Theme } from "../../../theme";

export default function DashboardHeader() {
  return (
    <View style={styles.container}>
      <AppText variant="h2">
        Dashboard
      </AppText>

      <AppText
        variant="bodySmall"
        color={Theme.colors.textSecondary}
      >
        Welcome back 👋
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
});