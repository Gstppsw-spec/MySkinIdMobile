import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isDark: boolean;
  title: string;
}

const EmptyState: React.FC<Props> = ({ isDark, title }) => (
  <View style={styles.emptyState}>
    <Ionicons name="cart-outline" size={48} color={isDark ? "#475569" : "#CBD5E1"} />
    <Text style={[styles.emptyStateText, isDark && { color: "#FFFFFF" }]}>
      Keranjang produk kosong
    </Text>
    <Text style={[styles.emptyStateSubtext, isDark && { color: "#94A3B8" }]}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60, paddingHorizontal: 40 },
  emptyStateText: { fontSize: 16, fontWeight: "600", color: "#475569", marginTop: 16, marginBottom: 8, textAlign: "center" },
  emptyStateSubtext: { fontSize: 14, color: "#94A3B8", textAlign: "center", lineHeight: 20 },
});

export default EmptyState;
