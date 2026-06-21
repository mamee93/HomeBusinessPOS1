import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import { AppButton, AppPage } from "../../../components/ui";

import useProducts from "../../products/hooks/useProducts";
import useCustomers from "../../customers/hooks/useCustomers";

import usePOS from "../hooks/usePOS";

import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import CustomerSelector from "../components/CustomerSelector";
import PaymentSelector from "../components/PaymentSelector";
import CartSummary from "../components/CartSummary";

import invoiceService from "../../invoices/services/invoiceService";

import { Theme } from "../../../theme";

export default function POSScreen() {
  const { products } = useProducts();

  const { customers } = useCustomers();

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

    addProduct,

    increase,
    decrease,

    removeProduct,

    clear,

    setCustomerId,
    setCustomerName,
    setPaymentMethod,
  } = usePOS();

  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        Alert.alert(
          "تنبيه",
          "السلة فارغة"
        );

        return;
      }

      await invoiceService.create(
        {
          customerId,

          discount,

          tax,

          paymentMethod,

          status: "completed",

          notes,
        },

        cart.map((item) => ({
          productId: item.product.id,

          productName: item.product.name,

          quantity: item.quantity,

          unitPrice:
            item.product.sellingPrice,

          costPrice:
            item.product.costPrice,

          total: item.subtotal,
        })),

        customerName
      );

      Alert.alert(
        "نجاح",
        "تم إنشاء الفاتورة بنجاح"
      );

      clear();
    } catch (error) {
      Alert.alert(
        "خطأ",
        error instanceof Error
          ? error.message
          : "حدث خطأ"
      );
    }
  };

  return (
    <AppPage
      title="نقطة البيع"
      scrollable
    >
      <ProductGrid
        products={products}
        onSelect={addProduct}
      />      <Cart
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
          setCustomerName(customer.name);
        }}
      />

      <PaymentSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      <CartSummary
        itemsCount={itemsCount}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
      />

      <View style={styles.footer}>
        <AppButton
          title="إتمام البيع"
          onPress={handleCheckout}
        />
      </View>

    </AppPage>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing["2xl"],
  },
});