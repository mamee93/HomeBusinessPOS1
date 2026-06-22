import React from "react";
import { StyleSheet, View } from "react-native";
import { Control } from "react-hook-form";

import {
  AppButton,
  AppCard,
  AppSection,
} from "../../../components/ui";

import {
  FormInput,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from "../../../components/forms";

import { Spacing } from "../../../theme";

import { ProductFormData } from "../types";
import useCategories from "../../categories/hooks/useCategories";

interface ProductFormProps {
  control: Control<ProductFormData>;

  loading?: boolean;

  onSubmit: () => void;

  submitTitle?: string;
}

export default function ProductForm({
  control,
  loading = false,
  onSubmit,
  submitTitle = "حفظ المنتج",
}: ProductFormProps) {
  const { categories } = useCategories();

  const categoryOptions = categories.map(
    (category) => ({
      label: category.name,
      value: category.id,
    })
  );

  return (
    <View style={styles.container}>
      <AppCard>
        <AppSection title="معلومات المنتج">
          <FormInput
            control={control}
            name="name"
            label="اسم المنتج"
            placeholder="أدخل اسم المنتج"
          />

          <FormInput
            control={control}
            name="sku"
            label="SKU"
            placeholder="SKU-001"
          />

          <FormInput
            control={control}
            name="barcode"
            label="الباركود"
            placeholder="123456789"
          />

          <FormSelect
            control={control}
            name="categoryId"
            label="التصنيف"
            placeholder="اختر التصنيف"
            options={categoryOptions}
          />

          <FormTextArea
            control={control}
            name="description"
            label="الوصف"
            placeholder="وصف المنتج"
          />
        </AppSection>
      </AppCard>

      <AppCard>
        <AppSection title="الأسعار">
          <FormNumberInput
            control={control}
            name="costPrice"
            label="سعر التكلفة"
            decimal
          />

          <FormNumberInput
            control={control}
            name="sellingPrice"
            label="سعر البيع"
            decimal
          />
        </AppSection>
      </AppCard>

      <AppCard>
        <AppSection title="المخزون">
          <FormNumberInput
            control={control}
            name="stock"
            label="الكمية"
          />

          <FormNumberInput
            control={control}
            name="minStock"
            label="الحد الأدنى"
          />

          <FormInput
            control={control}
            name="unit"
            label="الوحدة"
            placeholder="قطعة"
          />
        </AppSection>
      </AppCard>

      <AppButton
        title={submitTitle}
        loading={loading}
        disabled={loading}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});