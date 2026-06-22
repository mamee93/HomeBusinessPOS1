import React, { useMemo, useState } from "react";
import { router } from "expo-router";
import {AppList,AppPage,AppSearch,} from "../../../components/ui";
import useInvoices from "../hooks/useInvoices";
import { Pressable } from "react-native";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceStats from "../components/InvoiceStats";
import InvoiceFilters from "../components/InvoiceFilters";
import { InvoiceStatus } from "../../../types/invoice";
import InvoiceDateFilter, {DateFilter,} from "../components/InvoiceDateFilter";



export default function InvoicesScreen() {
  const [search, setSearch] = useState("");

    const [
  selectedDate,
  setSelectedDate,
] =
  useState<DateFilter>("all");

  
  const {
    invoices,
    loading,
  } = useInvoices();

    const [
  selectedStatus,
  setSelectedStatus,
] = useState<
  InvoiceStatus | "all"
>("all");

const filteredInvoices = useMemo(() => {
  let filtered = invoices;

  if (selectedStatus !== "all") {
    filtered = filtered.filter(
      (invoice) =>
        invoice.status === selectedStatus
    );
  }

  const keyword = search.trim().toLowerCase();

  if (!keyword) {
    return filtered;
  }

  return filtered.filter((invoice) => {
    return (
      invoice.invoiceNumber
        .toLowerCase()
        .includes(keyword) ||

      invoice.customerName
        ?.toLowerCase()
        .includes(keyword) ||

      invoice.paymentMethod
        .toLowerCase()
        .includes(keyword) ||

      invoice.status
        .toLowerCase()
        .includes(keyword)
    );
  });
}, [
  invoices,
  search,
  selectedStatus,
]);
<InvoiceFilters
  selected={selectedStatus}
  onSelect={setSelectedStatus}
/>

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
      <InvoiceStats
        invoices={filteredInvoices}
      />
      <AppList
        data={filteredInvoices}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyTitle="لا توجد فواتير"
        emptyDescription="لم يتم إنشاء أي فاتورة بعد."
        renderItem={({ item }) => (

<InvoiceCard
  invoice={item}
  onPress={() =>
    router.push({
      pathname: "/invoices/[id]",
      params: {
        id: item.id,
      },
    })
  }
/>


        )}
      />
    </AppPage>
  );
}