import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { AppHeader } from "./AppHeader";
import { AppScreen } from "./AppScreen";

interface AppPageProps {
  title: string;

  subtitle?: string;

  children: ReactNode;

  right?: React.ReactNode;

  scrollable?: boolean;

  style?: StyleProp<ViewStyle>;
}

export function AppPage({
  title,
  subtitle,
  children,
  right,
  scrollable = false,
  style,
}: AppPageProps) {
  return (
    <AppScreen
      scrollable={scrollable}
      style={style}
    >
      <AppHeader
        title={title}
        subtitle={subtitle}
        right={right}
      />

      <View style={styles.content}>
        {children}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});