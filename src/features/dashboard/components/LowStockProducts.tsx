import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import {
  AppCard,
  AppSection,
  AppText,
  AppDivider,
  AppEmptyState,
} from "../../../components/ui";

import {
  Colors,
  Spacing,
} from "../../../theme";

import { Product } from "../../../types/product";

interface Props {
  products: Product[];
}

export default function LowStockProducts({
  products,
}: Props) {
  if (products.length === 0) {
    return (
      <AppEmptyState
        title="لا توجد منتجات منخفضة المخزون"
        description="جميع المنتجات ضمن الحد الآمن."
      />
    );
  }

  return (
    <AppCard>
      <AppSection title="📦 المنتجات منخفضة المخزون">

        {products.map((product, index) => (
          <View key={product.id}>
            <View style={styles.row}>

              <View style={styles.info}>
                <AppText weight="700">
                  {product.name}
                </AppText>

                <AppText
                  variant="caption"
                  color={Colors.textSecondary}
                >
                  SKU: {product.sku}
                </AppText>
              </View>

              <AppText
                weight="700"
                color={Colors.danger}
              >
                {product.stock} {product.unit}
              </AppText>

            </View>

            {index < products.length - 1 && (
              <AppDivider />
            )}
          </View>
        ))}

      </AppSection>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },

  info: {
    flex: 1,
  },
});