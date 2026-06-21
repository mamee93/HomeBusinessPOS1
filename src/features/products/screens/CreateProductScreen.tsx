import React from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import { AppPage } from "../../../components/ui";
import ProductForm from "../components/ProductForm";

import { ProductFormData } from "../types";
import productService from "../services/productService";

const defaultValues: ProductFormData = {
  name: "",
  sku: "",
  barcode: "",
  categoryId: "",
  description: "",
  costPrice: 0,
  sellingPrice: 0,
  stock: 0,
  minStock: 0,
  unit: "",
  image: "",
  isActive: true,
};

export default function CreateProductScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues,
  });

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      await productService.create(data);

      reset();

      router.back();
    } catch (error) {
      console.error(
        "Failed to create product:",
        error
      );
    }
  };

  return (
    <AppPage
      title="إضافة منتج"
      scrollable
    >
      <ProductForm
        control={control}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        submitTitle="حفظ المنتج"
      />
    </AppPage>
  );
}