import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppPage,
  AppSection,
  AppText,
} from "../../../components/ui";

import { Product } from "../../../types/product";
import productService from "../services/productService";
import useCategories from "../../categories/hooks/useCategories";
import { Spacing } from "../../../theme";
import useCategoryLookup
from "../../categories/hooks/useCategoryLookup";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    getCategoryName,
} = useCategoryLookup();

  const [product, setProduct] =
    useState<Product | null>(null);

  const loadProduct = useCallback(async () => {
    if (!id) {
      return;
    }

    const data =
      await productService.getById(id);

    if (!data) {
      Alert.alert(
        "خطأ",
        "المنتج غير موجود"
      );

      router.back();

      return;
    }

    setProduct(data);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadProduct();
    }, [loadProduct])
  );

  if (!product) {
    return null;
  }

 

  const profit =
    product.sellingPrice -
    product.costPrice;

  return (
    <AppPage
      title={product.name}
      scrollable
    >
      <AppCard>
        <AppSection title="معلومات المنتج">
          <AppText>
            SKU: {product.sku}
          </AppText>

          <AppText>
            Barcode: {product.barcode || "-"}
          </AppText>

          <AppText>
              التصنيف:
              {getCategoryName(product.categoryId)}
          </AppText>

          {!!product.description && (
            <AppText>
              الوصف: {product.description}
            </AppText>
          )}
        </AppSection>
      </AppCard>

      <AppCard>
        <AppSection title="الأسعار">
          <AppText>
            التكلفة:{" "}
            {product.costPrice.toFixed(3)} ر.ع
          </AppText>

          <AppText>
            البيع:{" "}
            {product.sellingPrice.toFixed(3)} ر.ع
          </AppText>

          <AppText>
            الربح:{" "}
            {profit.toFixed(3)} ر.ع
          </AppText>
        </AppSection>
      </AppCard>

      <AppCard>
        <AppSection title="المخزون">
          <AppBadge
            label={`${product.stock} ${product.unit}`}
            variant={
              product.stock <=
              product.minStock
                ? "warning"
                : "success"
            }
          />
        </AppSection>
      </AppCard>

      <AppButton
        title="تعديل المنتج"
        onPress={() =>
          router.push({
            pathname:
              "/products/edit/[id]",
            params: {
              id: product.id,
            },
          })
        }
      />
    </AppPage>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg,
  },
});