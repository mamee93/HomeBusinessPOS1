import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import CategoryForm from "../components/CategoryForm";
import categoryService from "../services/categoryService";

import { Category } from "../../../types/category";
import { CategoryFormData } from "../types";

export default function EditCategoryScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CategoryFormData>();

  useEffect(() => {
    loadCategory();
  }, []);

  async function loadCategory() {
    try {
      const category = await categoryService.getById(id);

      if (!category) {
        Alert.alert(
          "خطأ",
          "التصنيف غير موجود."
        );

        router.back();

        return;
      }

      reset({
        name: category.name,
        color: category.color,
        icon: category.icon ?? "",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(
    data: CategoryFormData
  ) {
    try {
      await categoryService.update(
        id,
        data
      );

      router.back();
    } catch (error) {
      Alert.alert(
        "خطأ",
        "تعذر تحديث التصنيف."
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
      title="تعديل التصنيف"
      scrollable
    >
      <CategoryForm
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