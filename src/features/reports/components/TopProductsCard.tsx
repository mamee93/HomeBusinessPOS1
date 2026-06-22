import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import {
  AppCard,
  AppDivider,
  AppSection,
  AppText,
} from "../../../components/ui";

import { TopProduct } from "../../../core/analytics/types/analytics";
import { Theme } from "../../../theme";

interface Props {
  products: TopProduct[];
}

export default function TopProductsCard({
  products,
}: Props) {
  return (
    <AppCard>
      <AppSection title="أفضل المنتجات">

        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <AppDivider />
          )}
          renderItem={({ item, index }) => (
            <View style={styles.row}>

              <View style={styles.info}>
                <AppText
                  variant="body"
                  weight="600"
                >
                  {index + 1}. {item.productName}
                </AppText>

                <AppText
                  variant="caption"
                >
                  الكمية المباعة: {item.quantity}
                </AppText>
              </View>

              <AppText
                variant="body"
                weight="700"
              >
                {item.total.toFixed(2)}
              </AppText>

            </View>
          )}
        />

      </AppSection>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: Theme.spacing.sm,
  },

  info: {
    flex: 1,
  },
});