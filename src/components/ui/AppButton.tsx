import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "outline"
  | "ghost";

type Size =
  | "small"
  | "medium"
  | "large";

interface AppButtonProps
  extends Omit<PressableProps, "style"> {
  title: string;

  variant?: Variant;

  size?: Size;

  loading?: boolean;

  fullWidth?: boolean;

  rounded?: boolean;

  elevated?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = true,
  rounded = false,
  elevated = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={[
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        rounded && styles.rounded,
        elevated && Shadows.sm,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={getTextColor(variant)}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon}

          <AppText
            variant="button"
            color={getTextColor(variant)}
            style={styles.title}
          >
            {title}
          </AppText>

          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}

function getTextColor(
  variant: Variant
) {
  switch (variant) {
    case "outline":
    case "ghost":
      return Colors.primary;

    default:
      return Colors.white;
  }
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
  },

  fullWidth: {
    width: "100%",
  },

  rounded: {
    borderRadius: Radius.round,
  },

  disabled: {
    opacity: 0.5,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginHorizontal: Spacing.sm,
  },
});

const sizeStyles = StyleSheet.create({
  small: {
    height: 40,
    paddingHorizontal: Spacing.md,
  },

  medium: {
    height: 48,
    paddingHorizontal: Spacing.lg,
  },

  large: {
    height: 56,
    paddingHorizontal: Spacing.xl,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.info,
  },

  success: {
    backgroundColor: Colors.success,
  },

  danger: {
    backgroundColor: Colors.danger,
  },

  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  ghost: {
    backgroundColor: "transparent",
  },
});