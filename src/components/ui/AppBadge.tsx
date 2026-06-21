import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function AppBadge({
  label,
  variant = "primary",
}: AppBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        variantStyles[variant],
      ]}
    >
      <AppText
        variant="caption"
        weight="700"
        color={Colors.white}
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.xs,

    borderRadius: Radius.round,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
  },

  success: {
    backgroundColor: Colors.success,
  },

  warning: {
    backgroundColor: Colors.warning,
  },

  danger: {
    backgroundColor: Colors.danger,
  },

  info: {
    backgroundColor: Colors.info,
  },
});