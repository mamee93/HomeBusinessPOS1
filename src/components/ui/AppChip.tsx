import React from "react";
import {
  Pressable,
  StyleSheet,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

interface AppChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function AppChip({
  label,
  selected = false,
  onPress,
}: AppChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected && styles.selected,
      ]}
    >
      <AppText
        variant="caption"
        weight="600"
        color={
          selected
            ? Colors.white
            : Colors.text
        }
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,

    borderRadius: Radius.round,

    backgroundColor: Colors.background,

    borderWidth: 1,

    borderColor: Colors.border,
  },

  selected: {
    backgroundColor: Colors.primary,

    borderColor: Colors.primary,
  },
});