import React from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import ProductForm from "../components/ProductForm";
import useProducts from "../hooks/useProducts";

import { ProductFormData } from "../types";

export default function CreateProductScreen() {
  const { createProduct } = useProducts();

  const {
    control,
    handleSubmit,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      categoryId: "",
      image: "",
      description: "",
      costPrice: 0,
      sellingPrice: 0,
      stock: 0,
      minStock: 0,
      unit: "قطعة",
      isActive: true,
    },
  });

const onSubmit = async (data: ProductFormData) => {
  console.log("FORM DATA:", data);

  try {
    await createProduct(data);

    Alert.alert(
      "نجاح",
      "تم إنشاء المنتج بنجاح"
    );

    router.back();
  } catch (error) {
    console.error(error);

    Alert.alert(
      "خطأ",
      error instanceof Error
        ? error.message
        : "حدث خطأ"
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
        onSubmit={handleSubmit(onSubmit)}
      />
    </AppPage>
  );
}