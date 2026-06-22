import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import {
  AppCard,
  AppText,
} from "../../../components/ui";

import { Product } from "../../../types/product";
import { Theme } from "../../../theme";

interface Props {
  totalProducts: number;
  lowStockProducts: Product[];
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <AppCard style={styles.card}>
      <AppText variant="caption">
        {title}
      </AppText>

      <AppText
        variant="h3"
        weight="700"
      >
        {value}
      </AppText>
    </AppCard>
  );
}

export default function InventoryOverview({
  totalProducts,
  lowStockProducts,
}: Props) {
  return (
    <View style={styles.container}>
      <Stat
        title="إجمالي المنتجات"
        value={totalProducts}
      />

      <Stat
        title="منخفضة المخزون"
        value={lowStockProducts.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },

  card: {
    padding: Theme.spacing.lg,
  },
});