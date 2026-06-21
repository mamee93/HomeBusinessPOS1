import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

interface AppSearchProps
  extends Omit<TextInputProps, "style"> {
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppSearch({
  containerStyle,
  ...props
}: AppSearchProps) {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={Colors.textSecondary}
      />

      <TextInput
        {...props}
        style={styles.input}
        placeholder="بحث..."
        placeholderTextColor={
          Colors.textSecondary
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.md,

    paddingHorizontal: Spacing.md,

    height: 48,
  },

  input: {
    flex: 1,

    marginLeft: Spacing.sm,

    color: Colors.text,
  },
});