import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Spacing,
} from "../../theme";

interface AppLoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: "small" | "large";
}

export function AppLoading({
  message = "جاري التحميل...",
  fullScreen = false,
  size = "large",
}: AppLoadingProps) {
  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={Colors.primary}
      />

      <AppText
        style={styles.message}
        color={Colors.textSecondary}
      >
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },

  fullScreen: {
    flex: 1,
  },

  message: {
    marginTop: Spacing.md,
  },
});