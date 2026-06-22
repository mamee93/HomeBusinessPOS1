import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { router } from "expo-router";

import {
  AppButton,
  AppCard,
  AppSection,
} from "../../../components/ui";

import { Spacing } from "../../../theme";

export default function QuickActions() {
  return (
    <AppCard>
      <AppSection title="إجراءات سريعة">

        <View style={styles.row}>

          <AppButton
            title="🛒 بيع"
            fullWidth={false}
            onPress={() =>
              router.push("/pos")
            }
          />

          <AppButton
            title="📦 منتج"
            variant="outline"
            fullWidth={false}
            onPress={() =>
              router.push("/products/create")
            }
          />

        </View>

        <View style={styles.row}>

          <AppButton
            title="👤 عميل"
            variant="outline"
            fullWidth={false}
            onPress={() =>
              router.push("/customers/create")
            }
          />

          <AppButton
            title="🧾 الفواتير"
            variant="outline"
            fullWidth={false}
            onPress={() =>
              router.push("/invoices")
            }
          />

        </View>

      </AppSection>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
});