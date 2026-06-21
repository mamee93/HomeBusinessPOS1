import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import {
  AppButton,
  AppCard,
  AppList,
  AppPage,
  AppSearch,
  AppText,
  AppBadge,
} from "../../../components/ui";

import useCategories from "../hooks/useCategories";

export default function CategoriesScreen() {
  const [search, setSearch] = useState("");

  const {
    categories,
    loading,
    deleteCategory,
  } = useCategories();

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return categories;
    }

    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword)
    );
  }, [categories, search]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "حذف التصنيف",
      "هل تريد حذف هذا التصنيف؟",
      [
        {
          text: "إلغاء",
          style: "cancel",
        },
        {
          text: "حذف",
          style: "destructive",
          onPress: async () => {
            await deleteCategory(id);
          },
        },
      ]
    );
  };

  return (
    <AppPage
      title="التصنيفات"
      scrollable={false}
    >
      <AppSearch
        value={search}
        onChangeText={setSearch}
      />

      <AppList
        data={filteredCategories}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyTitle="لا توجد تصنيفات"
        emptyDescription="أضف أول تصنيف"
        renderItem={({ item }) => (
          <AppCard
            style={{
              marginBottom: 16,
            }}
          >
            <AppText
              variant="h4"
              weight="700"
            >
              {item.name}
            </AppText>

            <AppBadge
              label={item.isActive ? "نشط" : "غير نشط"}
              variant={
                item.isActive
                  ? "success"
                  : "danger"
              }
            />

            <AppText
              variant="caption"
            >
              اللون: {item.color}
            </AppText>

            {!!item.icon && (
              <AppText
                variant="caption"
              >
                الأيقونة: {item.icon}
              </AppText>
            )}

            <AppButton
              title="تعديل"
              variant="outline"
              size="small"
              onPress={() =>
                router.push({
                  pathname:
                    "/categories/edit/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
            />

            <AppButton
              title="حذف"
              variant="danger"
              size="small"
              onPress={() =>
                handleDelete(item.id)
              }
            />
          </AppCard>
        )}
      />

      <AppButton
        title="إضافة تصنيف"
        onPress={() =>
          router.push(
            "/categories/create"
          )
        }
      />
    </AppPage>
  );
}