import React, { useMemo, useCallback, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import {AppButton,AppList,AppPage,AppSearch,} from "../../../components/ui";
import useCategories from "../../categories/hooks/useCategories";
import useCategoryLookup from "../../categories/hooks/useCategoryLookup";
export default function ProductsScreen() {
  const [search, setSearch] = useState("");

  const {
    products,
    loading,
    deleteProduct,
  } = useProducts();

  const {
  getCategoryName,
} = useCategoryLookup();

  const {
  categories,
} = useCategories();

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(keyword) ||
        product.sku
          .toLowerCase()
          .includes(keyword) ||
        product.barcode
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [products, search]);

  const handleCreate = useCallback(() => {
    router.push("/products/create");
  }, []);

  const handleEdit = useCallback((id: string) => {
    router.push({
      pathname: "/products/edit/[id]",
      params: { id },
    });
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "حذف المنتج",
        "هل أنت متأكد من حذف هذا المنتج؟",
        [
          {
            text: "إلغاء",
            style: "cancel",
          },
          {
            text: "حذف",
            style: "destructive",
            onPress: async () => {
              await deleteProduct(id);
            },
          },
        ]
      );
    },
    [deleteProduct]
  );

  return (
    <AppPage
      title="المنتجات"
      scrollable={false}
    >
      <AppSearch
        value={search}
        onChangeText={setSearch}
        placeholder="ابحث بالاسم أو SKU أو الباركود..."
      />

      <AppList
        data={filteredProducts}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyTitle="لا توجد منتجات"
        emptyDescription="ابدأ بإضافة أول منتج"
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        renderItem={({ item }) => (
          <ProductCard
  product={item}
  categoryName={getCategoryName(item.categoryId)}
  onPress={() =>
    router.push({
      pathname: "/products/details/[id]",
      params: { id: item.id },
    })
  }
  onEdit={() => handleEdit(item.id)}
  onDelete={() => handleDelete(item.id)}
/>
        )}
      />

      <AppButton
        title="إضافة منتج"
        onPress={handleCreate}
      />
    </AppPage>
  );
}