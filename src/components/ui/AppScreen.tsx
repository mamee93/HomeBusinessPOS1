import React, { ReactNode } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Spacing,
} from "../../theme";

interface AppScreenProps {
  children: ReactNode;

  scrollable?: boolean;

  padded?: boolean;

  style?: StyleProp<ViewStyle>;
}

export function AppScreen({
  children,
  scrollable = false,
  padded = true,
  style,
}: AppScreenProps) {
  const content = (
    <View
      style={[
        styles.content,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  padded: {
    padding: Spacing.lg,
  },

  scrollContent: {
    flexGrow: 1,
  },
});