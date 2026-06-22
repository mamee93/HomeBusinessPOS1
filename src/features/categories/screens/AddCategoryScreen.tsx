import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { AppScreen } from "../../../components/ui";
import CategoryForm from "../components/CategoryForm";
import { CategoryFormData } from "../types";
import categoryService from "../services/categoryService";
import { Theme } from "../../../theme";

export default function AddCategoryScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {
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

    await categoryService.create(data);

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
  loading={isSubmitting}
  onSubmit={handleSubmit(onSubmit)}
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