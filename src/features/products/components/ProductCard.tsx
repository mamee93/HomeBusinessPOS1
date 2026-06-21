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

import {
  Colors,
  Spacing,
} from "../../../theme";

import { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;

  categoryName?: string;

  onEdit?: () => void;

  onDelete?: () => void;

  onPress?: () => void;
}

export default function ProductCard({
  product,
  categoryName = "-",
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
    <AppCard
      style={styles.card}
      onPress={onPress}
    >
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
          🏷️ {categoryName}
        </AppText>

        <AppText
          variant="caption"
          color={Colors.textSecondary}
        >
          SKU: {product.sku || "-"}
        </AppText>

        {!!product.barcode && (
          <AppText
            variant="caption"
            color={Colors.textSecondary}
          >
            Barcode: {product.barcode}
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
            title="👁 عرض"
            size="small"
            variant="primary"
            fullWidth={false}
            onPress={onPress}
          />

          <AppButton
            title="✏️ تعديل"
            size="small"
            variant="outline"
            fullWidth={false}
            onPress={onEdit}
          />

          <AppButton
            title="🗑 حذف"
            size="small"
            variant="danger"
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
    width: "100%",
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
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
});