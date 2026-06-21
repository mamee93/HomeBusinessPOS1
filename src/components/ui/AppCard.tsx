import React, { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
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
  onPress?: () => void;
}

export function AppCard({
  children,
  style,
  outlined = true,
  elevated = true,
  padding = "lg",
  onPress,
}: AppCardProps) {
  return (
    <Pressable
      onPress={onPress}
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
    </Pressable>
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