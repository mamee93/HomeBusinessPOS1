import { useState } from "react";
import { Alert } from "react-native";

import checkoutService from "../services/checkoutService";

import { usePOSContext } from "../context/POSContext";

export default function useCheckout() {
  const [loading, setLoading] = useState(false);

  const {
    cart,
    customerId,
    customerName,
    paymentMethod,
    discount,
    tax,
    notes,
   
    clear,
  } = usePOSContext();

  const checkout = async () => {
    if (cart.length === 0) {
      Alert.alert(
        "تنبيه",
        "السلة فارغة"
      );
      return false;
    }

    try {
      setLoading(true);

      await checkoutService.checkout({
        cart,
        customerId,
        customerName,
        paymentMethod,
        discount,
        tax,
        notes,
         
      });

      clear();

      Alert.alert(
        "نجاح",
        "تمت عملية البيع بنجاح"
      );

      return true;
    } catch (error) {
      Alert.alert(
        "خطأ",
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء البيع"
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkout,
  };
}