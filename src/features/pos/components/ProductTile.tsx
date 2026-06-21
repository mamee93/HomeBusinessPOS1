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

  onPress: () => void;
}

export default function ProductTile({
  product,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <AppCard style={styles.card}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholder}>
            <AppText
              variant="caption"
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

        <AppText
          variant="caption"
        >
          {product.sellingPrice.toFixed(3)} ر.ع
        </AppText>

        <View style={styles.footer}>
          <AppBadge
            label={`${product.stock}`}
            variant={
              product.stock > 0
                ? "success"
                : "danger"
            }
          />
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },

  placeholder: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },

  name: {
    marginBottom: Spacing.xs,
    minHeight: 40,
  },

  footer: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});