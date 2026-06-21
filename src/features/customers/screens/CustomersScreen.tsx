import React, { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import {
  AppButton,
  AppList,
  AppPage,
  AppSearch,
} from "../../../components/ui";

import CustomerCard from "../components/CustomerCard";
import useCustomers from "../hooks/useCustomers";

export default function CustomersScreen() {
  const [search, setSearch] = useState("");

  const {
    customers,
    loading,
    deleteCustomer,
  } = useCustomers();

  const filteredCustomers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(keyword) ||
        customer.phone
          .toLowerCase()
          .includes(keyword) ||
        customer.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [customers, search]);

  const handleCreate = useCallback(() => {
    router.push("/customers/create");
  }, []);

  const handleEdit = useCallback((id: string) => {
    router.push({
      pathname: "/customers/edit/[id]",
      params: {
        id,
      },
    });
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "حذف العميل",
        "هل تريد حذف هذا العميل؟",
        [
          {
            text: "إلغاء",
            style: "cancel",
          },
          {
            text: "حذف",
            style: "destructive",
            onPress: async () => {
              await deleteCustomer(id);
            },
          },
        ]
      );
    },
    [deleteCustomer]
  );

  return (
    <AppPage
      title="العملاء"
      scrollable={false}
    >
      <AppSearch
        value={search}
        onChangeText={setSearch}
        placeholder="ابحث بالاسم أو الهاتف..."
      />

      <AppList
        data={filteredCustomers}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyTitle="لا يوجد عملاء"
        emptyDescription="ابدأ بإضافة أول عميل"
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        renderItem={({ item }) => (
          <CustomerCard
            customer={item}
            onEdit={() =>
              handleEdit(item.id)
            }
            onDelete={() =>
              handleDelete(item.id)
            }
          />
        )}
      />

      <AppButton
        title="إضافة عميل"
        onPress={handleCreate}
      />
    </AppPage>
  );
}