import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

import {
  Colors,
  Spacing,
} from "../../theme";

interface AppEmptyStateProps {
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function AppEmptyState({
  title,
  description,
  actionTitle,
  onAction,
  icon,
}: AppEmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon}

      <AppText
        variant="h2"
        weight="700"
        align="center"
        style={styles.title}
      >
        {title}
      </AppText>

      {!!description && (
        <AppText
          align="center"
          color={Colors.textSecondary}
          style={styles.description}
        >
          {description}
        </AppText>
      )}

      {actionTitle && onAction && (
        <AppButton
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    padding: Spacing.xxxl,
  },

  title: {
    marginTop: Spacing.lg,
  },

  description: {
    marginTop: Spacing.sm,

    marginBottom: Spacing.xl,
  },

  button: {
    minWidth: 180,
  },
});