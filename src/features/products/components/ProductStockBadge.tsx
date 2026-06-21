import React from "react";

import { AppBadge } from "../../../components/ui";

interface ProductStockBadgeProps {
  stock: number;
}

export default function ProductStockBadge({
  stock,
}: ProductStockBadgeProps) {
  if (stock <= 0) {
    return (
      <AppBadge
        label="نفد"
        variant="danger"
      />
    );
  }

  if (stock <= 5) {
    return (
      <AppBadge
        label={`${stock} متبقي`}
        variant="warning"
      />
    );
  }

  return (
    <AppBadge
      label={`${stock} متوفر`}
      variant="success"
    />
  );
}