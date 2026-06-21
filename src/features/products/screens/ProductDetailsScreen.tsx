import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {AppButton, AppCard,AppLoading,AppScreen, AppText,} from "../../../components/ui";
import { Product } from "../../../types/product";
import productService from "../services/productService";
import { Theme } from "../../../theme";
import ProductActions from "../components/ProductActions";
export default function ProductDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    if (!id) return;

    const data =
      await productService.getById(id);

    setProduct(data ?? null);

    setLoading(false);
  }

  async function deleteCurrentProduct() {
    if (!product) return;

    Alert.alert(
      "حذف المنتج",
      "هل تريد حذف المنتج؟",
      [
        {
          text: "إلغاء",
          style: "cancel",
        },
        {
          text: "حذف",
          style: "destructive",
          onPress: async () => {
            await productService.remove(product.id);

            router.back();
          },
        },
      ]
    );
  }

  if (loading) {
    return <AppLoading />;
  }

  if (!product) {
    return (
      <AppScreen>
        <AppText>المنتج غير موجود.</AppText>
      </AppScreen>
    );
  }

  return (
    <AppScreen>

      <AppCard>

        <AppText variant="h2">
          {product.name}
        </AppText>

        <View style={styles.space} />

        <AppText>
          SKU : {product.sku}
        </AppText>

        <AppText>
          Barcode : {product.barcode}
        </AppText>

        <AppText>
          Cost : {product.costPrice}
        </AppText>

        <AppText>
          Price : {product.sellingPrice}
        </AppText>

        <AppText>
          Stock : {product.stock}
        </AppText>

        <AppText>
          Unit : {product.unit}
        </AppText>

      </AppCard>

      <ProductActions
  onEdit={() =>
    router.push(`/products/edit/${product.id}`)
  }
  onDelete={deleteCurrentProduct}
/>

    </AppScreen>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: Theme.spacing.xl,
  },

  space: {
    height: Theme.spacing.md,
  },
});