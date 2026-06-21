import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import {
  AppBadge,
  AppCard,
  AppPage,
  AppSection,
  AppText,
} from "../../../components/ui";

import customerService from "../services/customerService";
import { Customer } from "../../../types/customer";

import { Spacing } from "../../../theme";

export default function CustomerDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    try {
      const data =
        await customerService.getById(id);

      setCustomer(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
      />
    );
  }

  if (!customer) {
    return (
      <AppPage title="العميل">
        <AppText>
          العميل غير موجود.
        </AppText>
      </AppPage>
    );
  }

  return (
    <AppPage
      title={customer.name}
      scrollable
    >
      <AppCard>

        <AppSection title="بيانات العميل">

          <AppText>
            الاسم: {customer.name}
          </AppText>

          <AppText>
            الهاتف: {customer.phone}
          </AppText>

          {!!customer.email && (
            <AppText>
              البريد: {customer.email}
            </AppText>
          )}

          {!!customer.address && (
            <AppText>
              العنوان: {customer.address}
            </AppText>
          )}

          {!!customer.notes && (
            <AppText>
              الملاحظات: {customer.notes}
            </AppText>
          )}

          <AppBadge
            label={
              customer.isActive
                ? "نشط"
                : "غير نشط"
            }
            variant={
              customer.isActive
                ? "success"
                : "danger"
            }
          />

        </AppSection>

      </AppCard>
    </AppPage>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg,
  },
});