import React from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import {
  AppBadge,
  AppCard,
  AppDivider,
  AppSection,
  AppText,
} from "../../../components/ui";

import { Invoice } from "../../../types/invoice";
import { Theme } from "../../../theme";

interface Props {
  invoices: Invoice[];
}

function getStatusLabel(status: Invoice["status"]) {
  switch (status) {
    case "completed":
      return "مكتملة";

    case "draft":
      return "مسودة";

    case "cancelled":
      return "ملغاة";

    default:
      return status;
  }
}

export default function RecentInvoicesCard({
  invoices,
}: Props) {
  return (
    <AppCard>
      <AppSection title="آخر الفواتير">

        <FlatList
          data={invoices.slice(0, 10)}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <AppDivider />
          )}
          renderItem={({ item }) => (
            <View style={styles.row}>

              <View style={styles.info}>

                <AppText
                  variant="body"
                  weight="600"
                >
                  {item.invoiceNumber}
                </AppText>

                <AppText
                  variant="caption"
                >
                  {item.customerName}
                </AppText>

                <AppText
                  variant="caption"
                >
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </AppText>

              </View>

              <View style={styles.right}>

                <AppText
                  variant="body"
                  weight="700"
                >
                  {item.total.toFixed(2)}
                </AppText>

                <AppBadge
                  label={getStatusLabel(
                    item.status
                  )}
                />

              </View>

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

  right: {
    alignItems: "flex-end",
    gap: Theme.spacing.xs,
  },
});