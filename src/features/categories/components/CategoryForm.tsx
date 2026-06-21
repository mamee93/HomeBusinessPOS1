import React from "react";
import { View } from "react-native";
import { Control } from "react-hook-form";

import {
  AppButton,
  AppCard,
  AppSection,
} from "../../../components/ui";

import {
  FormInput,
} from "../../../components/forms";

import { CategoryFormData } from "../types";

interface Props {
  control: Control<CategoryFormData>;

  loading?: boolean;

  submitTitle?: string;

  onSubmit: () => void;
}

export default function CategoryForm({
  control,
  loading = false,
  submitTitle = "حفظ",
  onSubmit,
}: Props) {
  return (
    <View>

      <AppCard>

        <AppSection title="معلومات التصنيف">

          <FormInput
            control={control}
            name="name"
            label="اسم التصنيف"
            placeholder="مثال: المشروبات"
          />

          <FormInput
            control={control}
            name="color"
            label="اللون"
            placeholder="#3B82F6"
          />

          <FormInput
            control={control}
            name="icon"
            label="الأيقونة"
            placeholder="cart"
          />

        </AppSection>

      </AppCard>

      <AppButton
        title={submitTitle}
        loading={loading}
        onPress={onSubmit}
      />

    </View>
  );
}