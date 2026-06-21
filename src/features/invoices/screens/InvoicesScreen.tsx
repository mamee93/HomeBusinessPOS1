import React, { useMemo, useState } from "react";
import { router } from "expo-router";

import {
  AppCard,
  AppList,
  AppPage,
  AppSearch,
  AppText,
  AppBadge,
} from "../../../components/ui";

import useInvoices from "../hooks/useInvoices";
import { Pressable } from "react-native";
export default function InvoicesScreen() {
  const [search, setSearch] = useState("");

  const {
    invoices,
    loading,
  } = useInvoices();

  const filteredInvoices = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return invoices;
    }

    return invoices.filter((invoice) => {
      return (
        invoice.invoiceNumber
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [invoices, search]);

  return (
    <AppPage
      title="الفواتير"
      scrollable={false}
    >
      <AppSearch
        value={search}
        onChangeText={setSearch}
        placeholder="بحث برقم الفاتورة"
      />

      <AppList
        data={filteredInvoices}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyTitle="لا توجد فواتير"
        emptyDescription="لم يتم إنشاء أي فاتورة بعد."
        renderItem={({ item }) => (

          <Pressable
  onPress={() =>
    router.push({
      pathname: "/invoices/[id]",
      params: {
        id: item.id,
      },
    })
  }
>
  <AppCard
    style={{
      marginBottom: 16,
    }}
  >
    ...
  </AppCard>
</Pressable>


        )}
      />
    </AppPage>
  );
}