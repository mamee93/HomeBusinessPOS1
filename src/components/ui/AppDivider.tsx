import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Spacing,
} from "../../theme";

interface AppDividerProps {
  marginVertical?: keyof typeof Spacing;
  color?: string;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppDivider({
  marginVertical = "md",
  color = Colors.border,
  thickness = StyleSheet.hairlineWidth,
  style,
}: AppDividerProps) {
  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          marginVertical:
            Spacing[marginVertical],
        },
        style,
      ]}
    />
  );
}