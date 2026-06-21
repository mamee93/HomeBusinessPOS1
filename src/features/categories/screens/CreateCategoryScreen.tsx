import React from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import CategoryForm from "../components/CategoryForm";
import categoryService from "../services/categoryService";

import { CategoryFormData } from "../types";

const defaultValues: CategoryFormData = {
  name: "",
  color: "#3B82F6",
  icon: "grid",
};

export default function CreateCategoryScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues,
  });

  const onSubmit = async (
    data: CategoryFormData
  ) => {
    try {
      await categoryService.create(data);

      reset();

      router.back();
    } catch (error) {
      console.error(
        "Failed to create category:",
        error
      );
    }
  };

  return (
    <AppPage
      title="إضافة تصنيف"
      scrollable
    >
      <CategoryForm
        control={control}
        loading={isSubmitting}
        submitTitle="حفظ التصنيف"
        onSubmit={handleSubmit(onSubmit)}
      />
    </AppPage>
  );
}