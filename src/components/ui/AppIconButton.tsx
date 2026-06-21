import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost";

type Size =
  | "small"
  | "medium"
  | "large";

interface AppIconButtonProps
  extends Omit<PressableProps, "style"> {
  icon: React.ReactNode;

  variant?: Variant;

  size?: Size;

  style?: StyleProp<ViewStyle>;
}

export function AppIconButton({
  icon,
  variant = "ghost",
  size = "medium",
  disabled,
  style,
  ...props
}: AppIconButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={[
        styles.base,

        sizeStyles[size],

        variantStyles[variant],

        disabled && styles.disabled,

        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",

    alignItems: "center",

    borderRadius: Radius.round,
  },

  disabled: {
    opacity: 0.5,
  },
});

const sizeStyles = StyleSheet.create({
  small: {
    width: 36,
    height: 36,
  },

  medium: {
    width: 44,
    height: 44,
  },

  large: {
    width: 52,
    height: 52,
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

  ghost: {
    backgroundColor: "transparent",
    padding: Spacing.xs,
  },
});