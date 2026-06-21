import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "../../../components/ui";

import { Spacing } from "../../../theme";

import { InvoiceItem as InvoiceItemModel } from "../../../types/invoice";

interface Props {
  item: InvoiceItemModel;
}

export default function InvoiceItem({
  item,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <AppText weight="700">
          {item.productName}
        </AppText>

        <AppText variant="caption">
          {item.quantity} × {item.unitPrice.toFixed(3)} ر.ع
        </AppText>
      </View>

      <AppText weight="700">
        {item.total.toFixed(3)} ر.ع
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },
});