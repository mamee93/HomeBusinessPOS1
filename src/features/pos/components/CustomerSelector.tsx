import React from "react";
import { StyleSheet, View } from "react-native";

import { Customer } from "../../../types/customer";

import {
  AppCard,
  AppButton,
  AppText,
} from "../../../components/ui";

import { Theme } from "../../../theme";

interface Props {
  customers: Customer[];

  selectedCustomerId?: string;

  onSelect: (customer: Customer) => void;
}

export default function CustomerSelector({
  customers,
  selectedCustomerId,
  onSelect,
}: Props) {
  return (
    <AppCard>
      <AppText variant="h4">
        العميل
      </AppText>

      <View style={styles.container}>
        {customers.map((customer) => (
          <AppButton
            key={customer.id}
            title={customer.name}
            variant={
              selectedCustomerId === customer.id
                ? "primary"
                : "outline"
            }
            onPress={() =>
              onSelect(customer)
            }
          />
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
});