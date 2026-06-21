import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppSearch,
  AppText,
} from "../../../components/ui";

interface Props {
  search: string;

  onSearchChange: (text: string) => void;
}

export default function POSHeader({
  search,
  onSearchChange,
}: Props) {
  return (
    <View style={styles.container}>
      <AppText
        variant="h2"
        weight="700"
      >
        نقطة البيع
      </AppText>

      <AppSearch
        value={search}
        onChangeText={onSearchChange}
        placeholder="ابحث باسم المنتج أو الباركود..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});