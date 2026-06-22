import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import {
  AppCard,
  AppDivider,
  AppEmptyState,
  AppSection,
  AppText,
} from "../../../components/ui";

import { Spacing } from "../../../theme";

import {
  TopProduct,
} from "../types/dashboard";

interface Props {
  products: TopProduct[];
}

export default function TopProducts({
  products,
}: Props) {
  if (products.length === 0) {
    return (
      <AppEmptyState
        title="لا توجد مبيعات"
        description="لن تظهر أفضل المنتجات حتى يتم إنشاء فواتير."
      />
    );
  }

  return (
    <AppCard>
      <AppSection title="⭐ أفضل المنتجات">

        {products.map((product, index) => (
          <View
            key={product.productId}
          >
            <View style={styles.row}>

              <View style={styles.info}>
                <AppText weight="700">
                  {index + 1}.{" "}
                  {product.productName}
                </AppText>

                <AppText variant="caption">
                  {product.quantity} قطعة
                </AppText>
              </View>

              <AppText weight="700">
                {product.total.toFixed(3)} ر.ع
              </AppText>

            </View>

            {index <
              products.length - 1 && (
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