import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface AppCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  outlined?: boolean;
  elevated?: boolean;
  padding?: keyof typeof Spacing;
}

export function AppCard({
  children,
  style,
  outlined = true,
  elevated = true,
  padding = "lg",
}: AppCardProps) {
  return (
    <View
      style={[
        styles.card,

        outlined && styles.outlined,

        elevated && Shadows.sm,

        {
          padding: Spacing[padding],
        },

        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: Radius.lg,
  },

  outlined: {
    borderWidth: 1,

    borderColor: Colors.border,
  },
});