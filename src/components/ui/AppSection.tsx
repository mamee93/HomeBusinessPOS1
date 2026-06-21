import React, { ReactNode } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "./AppText";

import {
  Spacing,
} from "../../theme";

interface AppSectionProps {
  title?: string;

  subtitle?: string;

  right?: React.ReactNode;

  children: ReactNode;
}

export function AppSection({
  title,
  subtitle,
  right,
  children,
}: AppSectionProps) {
  return (
    <View style={styles.container}>
      {(title || right) && (
        <View style={styles.header}>
          <View style={styles.texts}>
            {!!title && (
              <AppText
    variant="h3"
    weight="700"
>
    {title}
</AppText>
            )}

            {!!subtitle && (
              <AppText
                variant="caption"
              >
                {subtitle}
              </AppText>
            )}
          </View>

          {right}
        </View>
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: Spacing.md,
  },

  texts: {
    flex: 1,
  },
});