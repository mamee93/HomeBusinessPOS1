import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Spacing,
} from "../../theme";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function AppHeader({
  title,
  subtitle,
  right,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText
          variant="h2"
          weight="700"
        >
          {title}
        </AppText>

        {!!subtitle && (
          <AppText
            color={Colors.textSecondary}
          >
            {subtitle}
          </AppText>
        )}
      </View>

      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: Spacing.lg,
  },

  content: {
    flex: 1,
  },
});