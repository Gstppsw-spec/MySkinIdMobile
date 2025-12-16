import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuantityControls from "./QtyControl";

interface Props {
  item: any;
  isDark: boolean;
  onToggleSelect: () => void;
  onUpdateQuantity: (type: string) => void;
  onRemove: () => void;
}

const CartItemCard: React.FC<Props> = ({
  item,
  isDark,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
}) => {


  return (
    <View style={styles.productCard}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onToggleSelect} style={styles.checkbox}>
          <Ionicons
            name={item.isSelected ? "checkbox" : "square-outline"}
            size={20}
            color={item.isSelected ? "#7C3AED" : "#64748B"}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: item.product.images[0].imageUrl }}
          style={styles.productImage}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.product.name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              Rp {(item.product.price / 1).toLocaleString("id-ID")}
            </Text>
            <Text style={styles.discountText}>
              {item.product.discountPercent / 1}%
            </Text>
          </View>
          <Text style={styles.currentPrice}>
            Rp{" "}
            {(
              item.product.price -
              (item.product.price * item.product.discountPercent) / 100
            ).toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.bottomLeft}>
          {item?.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FBBF24" />
              <Text style={styles.ratingText}>
                {item.rating} ({item.ratingCount})
              </Text>
            </View>
          )}

          {item?.sold && (
            <Text style={styles.soldText}>Terjual {item.sold}</Text>
          )}
        </View>

        <View style={styles.bottomRight}>
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name="trash-outline"
              size={18}
              color={isDark ? "#94A3B8" : "#64748B"}
            />
          </TouchableOpacity>

          <QuantityControls
            quantity={item.qty}
            isDark={isDark}
            onDecrease={() => onUpdateQuantity('reduce')}
            onIncrease={() => onUpdateQuantity('increase')}
          />
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
  productImage: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
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

export default CartItemCard;
