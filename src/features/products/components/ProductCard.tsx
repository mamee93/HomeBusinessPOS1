import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppText,
} from "../../../components/ui";

import { Colors, Spacing } from "../../../theme";
import { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;

  onEdit?: () => void;

  onDelete?: () => void;

  onPress?: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onPress,
}: ProductCardProps) {
  const stockVariant =
    product.stock <= 0
      ? "danger"
      : product.stock <= product.minStock
      ? "warning"
      : "success";

  const stockLabel =
    product.stock <= 0
      ? "نفد"
      : `${product.stock} ${product.unit}`;

  return (
    <AppCard style={styles.card}>
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <AppText
            variant="caption"
            color={Colors.textSecondary}
          >
            لا توجد صورة
          </AppText>
        </View>
      )}

      <View style={styles.content}>
        <AppText
          variant="h4"
          weight="700"
          numberOfLines={1}
        >
          {product.name}
        </AppText>

        <AppText
          variant="caption"
          color={Colors.textSecondary}
        >
          SKU: {product.sku}
        </AppText>

        {!!product.barcode && (
          <AppText
            variant="caption"
            color={Colors.textSecondary}
          >
            {product.barcode}
          </AppText>
        )}

        <View style={styles.priceRow}>
          <AppText weight="700">
            {product.sellingPrice.toFixed(3)} ر.ع
          </AppText>

          <AppBadge
            label={stockLabel}
            variant={stockVariant}
          />
        </View>

        <AppText
          variant="caption"
          color={Colors.textSecondary}
        >
          التكلفة: {product.costPrice.toFixed(3)} ر.ع
        </AppText>

        <View style={styles.actions}>
          <AppButton
            title="تعديل"
            variant="outline"
            size="small"
            fullWidth={false}
            onPress={onEdit}
          />

          <AppButton
            title="حذف"
            variant="danger"
            size="small"
            fullWidth={false}
            onPress={onDelete}
          />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 150,
  },

  placeholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  content: {
    marginTop: Spacing.md,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
});