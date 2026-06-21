import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import {
  AppBadge,
  AppCard,
  AppText,
} from "../../../components/ui";

import {
  Colors,
  Spacing,
} from "../../../theme";

import { Product } from "../../../types/product";

interface Props {
  product: Product;

  cartQuantity: number;

  onPress: () => void;
}

export default function ProductTile({
  product,
  cartQuantity,
  onPress,
}: Props) {
  const remainingStock =
  Math.max(
    0,
    product.stock - cartQuantity
  );

const outOfStock =
  remainingStock <= 0;

 const stockVariant =
  outOfStock
    ? "danger"
    : remainingStock <= 2
    ? "warning"
    : "success";

const stockLabel = outOfStock
  ? "نفد المخزون"
  : remainingStock <= 2
  ? `آخر ${remainingStock}`
  : `${remainingStock} ${product.unit}`;

  return (
    <Pressable
      onPress={onPress}
      disabled={
        outOfStock ||
        remainingStock <= 0
      }
      style={({ pressed }) => ({
        opacity:
            outOfStock ||
            remainingStock <= 0
              ? 0.5
              : pressed
              ? 0.9
              : 1
                })}
              >
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
              بدون صورة
            </AppText>
          </View>
        )}

        <AppText
          variant="body"
          weight="700"
          numberOfLines={2}
          style={styles.name}
        >
          {product.name}
        </AppText>

        {!!product.sku && (
          <AppText
            variant="caption"
            color={Colors.textSecondary}
          >
            {product.sku}
          </AppText>
        )}

        <AppText
          weight="700"
          style={styles.price}
        >
          {Number(
            product.sellingPrice ?? 0
          ).toFixed(3)} ر.ع
        </AppText>

<AppText
  variant="caption"
  color={Colors.textSecondary}
>
  المخزون: {product.stock}
</AppText>

<AppText
  variant="caption"
  color={Colors.textSecondary}
>
  في السلة: {cartQuantity}
</AppText>

<AppText
  variant="caption"
  weight="700"
  color={
    outOfStock
      ? Colors.danger
      : Colors.success
  }
>
  المتبقي: {remainingStock}
</AppText>

        <AppText
          variant="caption"
          color={Colors.textSecondary}
        >
          في السلة: {cartQuantity}
        </AppText>

        <View style={styles.footer}>
          <AppBadge
            label={stockLabel}
            variant={stockVariant}
          />

          <AppText
            variant="caption"
            color={Colors.textSecondary}
          >
            {product.unit}
          </AppText>
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: Spacing.md,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },

  placeholder: {
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    marginBottom: Spacing.sm,
  },

  name: {
    minHeight: 40,
    marginBottom: Spacing.xs,
  },

  price: {
    marginTop: Spacing.xs,
  },

  footer: {
    marginTop: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});