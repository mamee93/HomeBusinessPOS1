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
  FormTextArea,
} from "../../../components/forms";

import { Spacing } from "../../../theme";

import { CustomerFormData } from "../types";

interface Props {
  control: Control<CustomerFormData>;

  loading?: boolean;

  submitTitle?: string;

  onSubmit: () => void;
}

export default function CustomerForm({
  control,
  loading = false,
  submitTitle = "حفظ العميل",
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <AppCard>
        <AppSection title="بيانات العميل">

          <FormInput
            control={control}
            name="name"
            label="اسم العميل"
            placeholder="اسم العميل"
          />

          <FormInput
            control={control}
            name="phone"
            label="رقم الهاتف"
            placeholder="رقم الهاتف"
            keyboardType="phone-pad"
          />

          <FormInput
            control={control}
            name="email"
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            keyboardType="email-address"
          />

          <FormInput
            control={control}
            name="address"
            label="العنوان"
            placeholder="العنوان"
          />

          <FormTextArea
            control={control}
            name="notes"
            label="ملاحظات"
            placeholder="أي ملاحظات..."
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