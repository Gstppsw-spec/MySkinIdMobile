import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: any;
}

const CheckOutProductCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.topRow}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              Rp {item.price.toLocaleString("id-ID")}
            </Text>
            <Text style={styles.discountText}>
              {Math.round((1 - item.priceDiscount / item.price) * 100)}%
            </Text>
          </View>
          <Text style={styles.currentPrice}>
            Rp {item.priceDiscount.toLocaleString("id-ID")}
          </Text>
          <Text style={styles.soldText}>{item.quantity} Item</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  topRow: { flexDirection: "row", marginBottom: 12, alignItems: "center" },
  checkbox: { marginRight: 8, justifyContent: "center", alignItems: "center" },
  productImage: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  productInfo: { flex: 1 },
  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  originalPrice: {
    fontSize: 12,
    color: "#94A3B8",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  discountText: { fontSize: 12, color: "#DC2626", fontWeight: "700" },
  currentPrice: { fontSize: 14, fontWeight: "700", color: "#7C3AED" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLeft: { flexDirection: "row", alignItems: "center" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ratingText: { fontSize: 10, color: "#475569", marginLeft: 4 },
  soldText: { fontSize: 10, color: "#64748B" },
  bottomRight: { flexDirection: "row", alignItems: "center" },
  deleteButton: { marginRight: 12 },
});

export default CheckOutProductCard;
