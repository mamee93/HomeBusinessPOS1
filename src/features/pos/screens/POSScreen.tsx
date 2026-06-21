import React, { useMemo, useState } from "react";
import { Alert } from "react-native";

import { AppPage } from "../../../components/ui";

import useProducts from "../../products/hooks/useProducts";
import useCustomers from "../../customers/hooks/useCustomers";

import { usePOSContext } from "../context/POSContext";
import useCheckout from "../hooks/useCheckout";

import POSHeader from "../components/POSHeader";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import CustomerSelector from "../components/CustomerSelector";
import OrderSummary from "../components/OrderSummary";
import { PaymentSheet } from "../components/PaymentSheet";
import useCategories from "../../categories/hooks/useCategories";
import CategoryFilter from "../components/CategoryFilter";
import { PaymentMethod } from "../../../types/invoice";

export default function POSScreen() {
  const {
    products,
    loading,
  } = useProducts();

  const {
  categories,
} = useCategories();

const [
  selectedCategoryId,
  setSelectedCategoryId,
] = useState<string | null>(null);

  const {
    customers,
  } = useCustomers();

  const {
    cart,

    customerId,
    customerName,

    paymentMethod,

    discount,
    tax,

    notes,

    subtotal,
    total,

    itemsCount,

    setCustomerId,
    setCustomerName,

    setPaymentMethod,

    setDiscount,
    setTax,

    setNotes,

    addProduct,

    removeProduct,

    increase,
    decrease,

    clear,
  } = usePOSContext();

  const {
    checkout,
    loading: checkoutLoading,
  } = useCheckout();

  const [search, setSearch] =
    useState("");

  const [paymentVisible, setPaymentVisible] =
    useState(false);

const filteredProducts =
  useMemo(() => {

    let filtered = products;

    if (selectedCategoryId) {
      filtered = filtered.filter(
        (product) =>
          product.categoryId ===
          selectedCategoryId
      );
    }

    const keyword =
      search
        .trim()
        .toLowerCase();

    if (keyword) {
      filtered = filtered.filter(
        (product) =>
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
    }

    return filtered;

  }, [
    products,
    search,
    selectedCategoryId,
  ]);
   
   
   const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(
        "تنبيه",
        "السلة فارغة"
      );
      return;
    }

    setPaymentVisible(true);
  };

  const handleConfirmPayment = async (
  paymentMethod: PaymentMethod,
  paidAmount: number
) => {
    try {
      setPaymentMethod(paymentMethod);

      const success = await checkout();

      if (!success) {
        return;
      }

      setPaymentVisible(false);

      Alert.alert(
        "نجاح",
        "تم إنشاء الفاتورة بنجاح"
      );
    } catch (error) {
      Alert.alert(
        "خطأ",
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء البيع"
      );
    }
  };  return (
    <>
      <AppPage
        title="نقطة البيع"
        scrollable
      >
        <POSHeader
          search={search}
          onSearchChange={setSearch}
        />
        <CategoryFilter
            categories={categories}
            selectedCategoryId={
              selectedCategoryId
            }
            onSelect={
              setSelectedCategoryId
            }
        />

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          cart={cart}
          onSelect={addProduct}
        />

        <Cart
          items={cart}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={removeProduct}
        />

        <CustomerSelector
          customers={customers}
          selectedCustomerId={customerId}
          onSelect={(customer) => {
            setCustomerId(customer.id);
          }}
        />

        <OrderSummary
          totalItems={itemsCount}
          subtotal={subtotal}
          total={total}
          onCheckout={handleCheckout}
          onClearCart={clear}
        />
      </AppPage>

      <PaymentSheet
        visible={paymentVisible}
        total={total}
        loading={checkoutLoading}
        onClose={() => setPaymentVisible(false)}
        onConfirm={handleConfirmPayment}
      />
    </>
  );
}