import React from "react";
import {
  Pressable,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Radius,
  Shadows,
} from "../../theme";

interface AppFabProps {
  icon: React.ReactNode;

  onPress: () => void;
}

export function AppFab({
  icon,
  onPress,
}: AppFabProps) {
  return (
    <Pressable
      style={styles.fab}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",

    right: 24,

    bottom: 24,

    width: 60,

    height: 60,

    borderRadius: Radius.round,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    ...Shadows.md,
  },
});