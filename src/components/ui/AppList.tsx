import React from "react";
import {
  FlatList,
  FlatListProps,
} from "react-native";

import { AppEmptyState } from "./AppEmptyState";
import { AppLoading } from "./AppLoading";

interface AppListProps<T>
  extends FlatListProps<T> {
  loading?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;
}

export function AppList<T>({
  loading = false,
  emptyTitle = "لا توجد بيانات",
  emptyDescription,
  ...props
}: AppListProps<T>) {
  if (loading) {
    return (
      <AppLoading fullScreen />
    );
  }

  if (
    !props.data ||
    props.data.length === 0
  ) {
    return (
      <AppEmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <FlatList
      {...props}
      showsVerticalScrollIndicator={false}
    />
  );
}