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

import { TopCustomer } from "../../../core/analytics/types/analytics";
import { Theme } from "../../../theme";

interface Props {
  customers: TopCustomer[];
}

export default function TopCustomersCard({
  customers,
}: Props) {
  return (
    <AppCard>
      <AppSection title="أفضل العملاء">

        <FlatList
          data={customers}
          keyExtractor={(item) => item.customerId}
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
                  {index + 1}. {item.customerName}
                </AppText>

                <AppText variant="caption">
                    عدد الفواتير: {item.invoices}
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