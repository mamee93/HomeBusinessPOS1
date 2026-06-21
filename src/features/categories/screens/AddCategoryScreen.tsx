import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import {
  AppButton,
  AppScreen,
} from "../../../components/ui";

import CategoryForm from "../components/CategoryForm";
import { CategoryFormData } from "../types";
import { Category } from "../../../types/category";

import categoryService from "../services/categoryService";
import { generateId } from "../../../utils/id";
import { Theme } from "../../../theme";

export default function AddCategoryScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      color: "#2563EB",
      icon: "shopping-bag",
    },
  });

  async function onSubmit(data: CategoryFormData) {
    const now = new Date().toISOString();

    const category: Category = {
      id: generateId(),

      name: data.name,

      color: data.color,

      icon: data.icon,

      isActive: true,

      createdAt: now,

      updatedAt: now,
    };

    await categoryService.create(category);

    reset();

    router.back();
  }

  return (
    <AppScreen>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <CategoryForm
          control={control}
          errors={errors}
        />

        <AppButton
          title="حفظ التصنيف"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Theme.spacing.xxxl,
    gap: Theme.spacing.lg,
  },
});