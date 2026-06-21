import React, { useMemo, useState } from "react";
import { Modal,Pressable,StyleSheet,Text,TextInput,View,} from "react-native";
import type { PaymentMethod } from "../../../types/invoice";
 

interface PaymentSheetProps {
  visible: boolean;
  total: number;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (
    paymentMethod: PaymentMethod,
    paidAmount: number
  ) => void;
}

export function PaymentSheet({
  visible,
  total,
  loading = false,
  onClose,
  onConfirm,
}: PaymentSheetProps) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [paidAmount, setPaidAmount] =
    useState("");

  const paid = Number(paidAmount) || 0;

  const change = useMemo(() => {
    if (paymentMethod !== "cash") {
      return 0;
    }

    return Math.max(0, paid - total);
  }, [paid, total, paymentMethod]);

  const canConfirm =
    paymentMethod === "cash"
      ? paid >= total
      : true;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>
            إتمام الدفع
          </Text>

          <Text style={styles.total}>
            الإجمالي: {total.toFixed(3)} ر.ع
          </Text>

          <View style={styles.methods}>
  {(["cash", "card", "bank", "mixed"] as const).map(
    (method) => (
      <Pressable
        key={method}
        style={[
          styles.methodButton,
          paymentMethod === method &&
            styles.methodButtonActive,
        ]}
        onPress={() =>
          setPaymentMethod(method)
        }
      >
        <Text
          style={[
            styles.methodText,
            paymentMethod === method &&
              styles.methodTextActive,
          ]}
        >
          {method === "cash"
            ? "نقدًا"
            : method === "card"
            ? "بطاقة"
            : method === "bank"
            ? "تحويل بنكي"
            : "دفع مختلط"}
        </Text>
      </Pressable>
    )
  )}
</View>

          {paymentMethod === "cash" && (
            <>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="المبلغ المستلم"
                value={paidAmount}
                onChangeText={setPaidAmount}
              />

              <Text style={styles.change}>
                الباقي: {change.toFixed(3)} ر.ع
              </Text>
            </>
          )}

          <Pressable
            style={[
              styles.confirmButton,
              (!canConfirm || loading) &&
                styles.disabled,
            ]}
            disabled={!canConfirm || loading}
            onPress={() =>
              onConfirm(paymentMethod, paid)
            }
          >
            <Text style={styles.confirmText}>
              إتمام البيع
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>
              إلغاء
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  total: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  methods: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  methodButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
  },

  methodButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  methodText: {
    color: "#333",
    fontWeight: "600",
  },

  methodTextActive: {
    color: "#FFF",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },

  change: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  confirmButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },

  cancelText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.5,
  },
});