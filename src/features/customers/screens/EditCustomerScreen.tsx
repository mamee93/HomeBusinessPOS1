import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import CustomerForm from "../components/CustomerForm";
import customerService from "../services/customerService";

import { CustomerFormData } from "../types";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [loading, setLoading] =
    useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CustomerFormData>();

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    try {
      const customer =
        await customerService.getById(id);

      if (!customer) {
        Alert.alert(
          "خطأ",
          "العميل غير موجود."
        );

        router.back();

        return;
      }

      reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email ?? "",
        address: customer.address ?? "",
        notes: customer.notes ?? "",
        isActive: customer.isActive,
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(
    data: CustomerFormData
  ) {
    try {
      await customerService.update(
        id,
        data
      );

      router.back();
    } catch {
      Alert.alert(
        "خطأ",
        "تعذر تحديث العميل."
      );
    }
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <AppPage
      title="تعديل العميل"
      scrollable
    >
      <CustomerForm
        control={control}
        loading={isSubmitting}
        submitTitle="حفظ التعديلات"
        onSubmit={handleSubmit(
          onSubmit
        )}
      />
    </AppPage>
  );
}