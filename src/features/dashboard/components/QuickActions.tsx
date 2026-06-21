import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard, AppText } from "../../../components/ui";
import { Theme } from "../../../theme";

interface Action {
  title: string;
  onPress: () => void;
}

interface Props {
  actions: Action[];
}

export default function QuickActions({
  actions,
}: Props) {
  return (
    <AppCard>
      <AppText variant="h4">
        الإجراءات السريعة
      </AppText>

      <View style={styles.container}>
        {actions.map((item) => (
          <Pressable
            key={item.title}
            onPress={item.onPress}
            style={styles.button}
          >
            <AppText style={styles.buttonText}>
              {item.title}
            </AppText>
          </Pressable>
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
  },

  button: {
  flex: 1,
  minWidth: 120,
  padding: Theme.spacing.lg,
  borderRadius: Theme.radius.md,

  backgroundColor: Theme.colors.surface,
  borderWidth: 1,
  borderColor: Theme.colors.primary,

  alignItems: "center",
  justifyContent: "center",
},

  buttonText: {
    textAlign: "center",
  },
});