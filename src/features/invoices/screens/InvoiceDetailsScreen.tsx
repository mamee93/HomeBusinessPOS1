import React from "react";
import { Alert } from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppDivider,
  AppPage,
  AppSection,
  AppText,
} from "../../../components/ui";

import { Colors } from "../../../theme";

import InvoiceItem from "../components/InvoiceItem";
import InvoiceActions from "../components/InvoiceActions";
import useInvoice from "../hooks/useInvoice";

export default function InvoiceDetailsScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    invoice,
    loading,
    error,
    cancel,
  } = useInvoice(id);

  if (loading) {
    return (
      <AppPage
        title="الفاتورة"
        scrollable
      >
        <AppText>
          جاري تحميل الفاتورة...
        </AppText>
      </AppPage>
    );
  }

  if (!invoice) {
    return (
      <AppPage
        title="الفاتورة"
        scrollable
      >
        <AppText>
          {error ?? "الفاتورة غير موجودة"}
        </AppText>

        <AppButton
          title="رجوع"
          variant="outline"
          onPress={() =>
            router.back()
          }
        />
      </AppPage>
    );
  }

  const statusLabel =
    invoice.status === "completed"
      ? "مكتملة"
      : invoice.status === "cancelled"
      ? "ملغاة"
      : "مسودة";

  const paymentLabel =
    invoice.paymentMethod === "cash"
      ? "نقداً"
      : invoice.paymentMethod === "card"
      ? "بطاقة"
      : invoice.paymentMethod ===
        "bank"
      ? "تحويل بنكي"
      : "مختلط";

  const handleCancel = () => {
    Alert.alert(
      "إلغاء الفاتورة",
      "هل أنت متأكد من إلغاء هذه الفاتورة؟",
      [
        {
          text: "رجوع",
          style: "cancel",
        },
        {
          text: "إلغاء",
          style: "destructive",
          onPress: async () => {
            try {
              await cancel();

              Alert.alert(
                "تم",
                "تم إلغاء الفاتورة"
              );
            } catch {
              Alert.alert(
                "خطأ",
                "تعذر إلغاء الفاتورة"
              );
            }
          },
        },
      ]
    );
  };

  return (
    <AppPage
  title={invoice.invoiceNumber}
  scrollable
>
  <AppCard>
    <AppSection title="بيانات الفاتورة">

      <AppBadge
        label={statusLabel}
        variant={
          invoice.status === "completed"
            ? "success"
            : invoice.status === "cancelled"
            ? "danger"
            : "warning"
        }
      />

      <AppDivider />

      <AppText>
        👤 العميل:
        {" "}
        {invoice.customerName ??
          "عميل نقدي"}
      </AppText>

      <AppText>
        💳 طريقة الدفع:
        {" "}
        {paymentLabel}
      </AppText>

      <AppText>
        📅 التاريخ:
        {" "}
        {new Date(
          invoice.createdAt
        ).toLocaleString()}
      </AppText>

      {invoice.notes ? (
        <AppText>
          📝
          {" "}
          {invoice.notes}
        </AppText>
      ) : null}

    </AppSection>
  </AppCard>

  <AppCard>

    <AppSection title="الأصناف">

      {invoice.items.map(
        (item) => (
          <InvoiceItem
            key={item.productId}
            item={item}
          />
        )
      )}

    </AppSection>

  </AppCard>

  <AppCard>

    <AppSection title="ملخص الفاتورة">

      <AppText>
        الإجمالي الفرعي:
        {" "}
        {invoice.subtotal.toFixed(3)}
        {" "}
        ر.ع
      </AppText>

      <AppText>
        الخصم:
        {" "}
        {invoice.discount.toFixed(3)}
        {" "}
        ر.ع
      </AppText>

      <AppText>
        الضريبة:
        {" "}
        {invoice.tax.toFixed(3)}
        {" "}
        ر.ع
      </AppText>

      <AppDivider />

      <AppText
        variant="h3"
        weight="700"
        color={Colors.primary}
      >
        الإجمالي:
        {" "}
        {invoice.total.toFixed(3)}
        {" "}
        ر.ع
      </AppText>

    </AppSection>

  </AppCard>      <InvoiceActions
        cancelled={
          invoice.status === "cancelled"
        }
        onView={() => {}}
        onPrint={() => {
          Alert.alert(
            "قريبًا",
            "ميزة الطباعة ستكون متوفرة قريبًا"
          );
        }}
        onShare={() => {
          Alert.alert(
            "قريبًا",
            "ميزة المشاركة ستكون متوفرة قريبًا"
          );
        }}
        onCancel={handleCancel}
      />

      <AppButton
        title="رجوع"
        variant="outline"
        onPress={() => router.back()}
      />
    </AppPage>
  );
}