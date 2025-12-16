import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PaymentSummaryCardProps {
  subtotal: number;
  shippingFee: number;
  discount?: number;
  total: number;
  isDark: boolean;
  typeCheckOut: any;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  subtotal,
  shippingFee,
  discount = 0,
  total,
  isDark,
  typeCheckOut,
}) => {
  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <Text style={[styles.title, isDark && styles.textDark]}>
        Rincian Pembayaran
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, isDark && styles.textDark]}>
          Subtotal Produk
        </Text>
        <Text style={[styles.value, isDark && styles.textDark]}>
          Rp {subtotal.toLocaleString("id-ID")}
        </Text>
      </View>

      {typeCheckOut == "product" && (
        <>
          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDark]}>
              Ongkir
            </Text>
            <Text style={[styles.value, isDark && styles.textDark]}>
              Rp {shippingFee.toLocaleString("id-ID")}
            </Text>
          </View>
        </>
      )}

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.textDark]}>Diskon</Text>
          <Text style={[styles.value, isDark && styles.textDark]}>
            - Rp {discount.toLocaleString("id-ID")}
          </Text>
        </View>
      )}

      <View style={[styles.row, styles.totalRow]}>
        <Text style={[styles.totalLabel, isDark && styles.textDark]}>
          Total
        </Text>
        <Text style={[styles.totalValue, isDark && styles.textDark]}>
          Rp {total.toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardDark: {
    backgroundColor: "#2A1A5E",
    borderColor: "#4C1D95",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1E293B",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  totalRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  textDark: {
    color: "#FFFFFF",
  },
});

export default PaymentSummaryCard;
