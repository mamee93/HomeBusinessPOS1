import React from "react";
import {
  StyleSheet,
  TextInput,
} from "react-native";

import { Theme } from "../../../theme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function ProductSearch({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="ابحث عن منتج..."
      placeholderTextColor={Theme.colors.textMuted}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.lg,
    height: 48,
    marginBottom: Theme.spacing.lg,
    color: Theme.colors.text,
  },
});