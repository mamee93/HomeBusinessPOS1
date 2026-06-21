import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

import {
  Colors,
  Typography,
} from "../../theme";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "button";

type FontWeight =
  | "400"
  | "500"
  | "600"
  | "700";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  weight?: FontWeight;
  color?: string;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
}

export function AppText({
  children,
  variant = "body",
  weight,
  color = Colors.text,
  align = "left",
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        Typography[variant],
        {
          color,
          textAlign: align,
          fontWeight:
            weight ??
            Typography[variant].fontWeight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});