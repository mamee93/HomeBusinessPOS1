import React from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import CustomerForm from "../components/CustomerForm";
import customerService from "../services/customerService";

import { CustomerFormData } from "../types";

const defaultValues: CustomerFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  isActive: true,
};

export default function CreateCustomerScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CustomerFormData>({
    defaultValues,
  });

  const onSubmit = async (
    data: CustomerFormData
  ) => {
    try {
      await customerService.create(data);

      reset();

      router.back();
    } catch (error) {
      console.error(
        "Failed to create customer:",
        error
      );
    }
  };

  return (
    <AppPage
      title="إضافة عميل"
      scrollable
    >
      <CustomerForm
        control={control}
        loading={isSubmitting}
        submitTitle="حفظ العميل"
        onSubmit={handleSubmit(onSubmit)}
      />
    </AppPage>
  );
}