import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import ProductForm from "../components/ProductForm";
import productService from "../services/productService";

import { Product } from "../../../types/product";
import { ProductFormData } from "../types";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [loading, setLoading] =
    useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const product =
        await productService.getById(id);

      if (!product) {
        Alert.alert(
          "خطأ",
          "المنتج غير موجود."
        );

        router.back();

        return;
      }

      reset({
        name: product.name,
        sku: product.sku,
        barcode: product.barcode ?? "",
        categoryId: product.categoryId,
        description:
          product.description ?? "",
        costPrice: product.costPrice,
        sellingPrice:
          product.sellingPrice,
        stock: product.stock,
        minStock: product.minStock,
        unit: product.unit,
        image: product.image ?? "",
        isActive: product.isActive,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      await productService.update(
        id,
        data
      );

      router.back();
    } catch (error) {
      Alert.alert(
        "خطأ",
        "تعذر تحديث المنتج."
      );
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <AppPage
      title="تعديل المنتج"
      scrollable
    >
      <ProductForm
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