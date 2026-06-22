import React from "react";
import { router } from "expo-router";

import {
  AppCard,
  AppSection,
  AppList,
  AppEmptyState,
} from "../../../components/ui";

import { Invoice } from "../../../types/invoice";

import InvoiceCard from "../../invoices/components/InvoiceCard";

interface Props {
  invoices: Invoice[];
}

export default function RecentInvoices({
  invoices,
}: Props) {
  const recent = [...invoices]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <AppEmptyState
        title="لا توجد فواتير"
        description="لم يتم إنشاء أي فاتورة بعد."
      />
    );
  }

  return (
    <AppCard>
      <AppSection title="آخر الفواتير">

        <AppList
          data={recent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InvoiceCard
              invoice={item}
              onPress={() =>
                router.push({
                  pathname:
                    "/invoices/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
            />
          )}
        />

      </AppSection>
    </AppCard>
  );
}