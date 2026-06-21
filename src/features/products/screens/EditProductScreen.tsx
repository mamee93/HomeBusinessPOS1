import React, {
  useEffect,
  useState,
} from "react";

import { Alert } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useForm } from "react-hook-form";

import { AppPage } from "../../../components/ui";

import ProductForm from "../components/ProductForm";

import useProducts from "../hooks/useProducts";

import productService from "../services/productService";

import { ProductFormData } from "../types";

export default function EditProductScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<ProductFormData>();

  const {
    updateProduct,
  } = useProducts();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct =
    async () => {
      if (!id) {
        return;
      }

      const product =
        await productService.getById(
          id
        );

      if (!product) {
        Alert.alert(
          "خطأ",
          "المنتج غير موجود"
        );

        router.back();

        return;
      }

      reset({
        name: product.name,
        sku: product.sku,
        barcode:
          product.barcode,
        categoryId:
          product.categoryId,
        image: product.image,
        description:
          product.description,
        costPrice:
          product.costPrice,
        sellingPrice:
          product.sellingPrice,
        stock:
          product.stock,
        minStock:
          product.minStock,
        unit: product.unit,
        isActive:
          product.isActive,
      });

      setLoading(false);
    };

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      await updateProduct(
        id,
        data
      );

      Alert.alert(
        "نجاح",
        "تم تحديث المنتج"
      );

      router.back();
    } catch (error) {
      Alert.alert(
        "خطأ",
        error instanceof Error
          ? error.message
          : "حدث خطأ"
      );
    }
  };

if (loading) {
  return null;
}

  return (
    <AppPage
      title="تعديل المنتج"
      scrollable
    >
      <ProductForm
        control={control}
        onSubmit={handleSubmit(
          onSubmit
        )}
        submitTitle="حفظ التعديلات"
      />
    </AppPage>
  );
}