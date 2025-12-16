import React, { useState } from "react";
import { View, SectionList, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import HeaderBack from "@/components/header/HeaderBack";

interface PaymentMethod {
  id: number;
  label: string;
  description: string;
}

interface Props {
  isDark: boolean;
  initialSelectedId?: number;
  onSelect: (id: number) => void;
}

const PaymentMethodScreen: React.FC<Props> = ({
  isDark,
  initialSelectedId,
  onSelect,
}) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    initialSelectedId || null
  );

  // Pembagian kategori metode pembayaran
  const paymentSections = [
    {
      title: "E-Wallet",
      data: [
        { id: 1, label: "OVO", description: "E-wallet OVO" },
        { id: 2, label: "GoPay", description: "E-wallet GoPay" },
        { id: 3, label: "DANA", description: "E-wallet DANA" },
      ],
    },
    {
      title: "Virtual Account",
      data: [
        { id: 4, label: "BCA Virtual Account", description: "VA BCA" },
        { id: 5, label: "Mandiri Virtual Account", description: "VA Mandiri" },
      ],
    },
    {
      title: "Kartu Kredit / Debit",
      data: [
        { id: 6, label: "Visa", description: "Kartu Kredit Visa" },
        { id: 7, label: "Mastercard", description: "Kartu Kredit Mastercard" },
      ],
    },
    {
      title: "Bayar Cicilan / Paylater",
      data: [
        { id: 8, label: "Kredivo", description: "Bayar Cicilan Kredivo" },
        { id: 9, label: "Akulaku", description: "Bayar Cicilan Akulaku" },
      ],
    },
  ];

  const handleSelect = (id: number) => {
    setSelectedPaymentId(id);
    onSelect(id);
    router.back();
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <HeaderBack title="Pilih Metode Pembayaran" />

      <SectionList
        sections={paymentSections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PaymentMethodCard
            label={item.label}
            description={item.description}
            selected={selectedPaymentId === item.id}
            isDark={isDark}
            onPress={() => handleSelect(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, isDark && styles.textDark]}>
            {title}
          </Text>
        )}
        contentContainerStyle={styles.contentContainer}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  containerDark: {
    backgroundColor: "#1E1B2E",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 24,
    marginBottom: 8,
  },
  textDark: {
    color: "#FFFFFF",
  },
});

export default PaymentMethodScreen;
