import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuantityControls from "./QtyControl";

interface Props {
  item: any;
  isDark: boolean;
  onToggleSelect: () => void;
  onUpdateQuantity: (type: string) => void;
  onRemove: () => void;
}

const CartTreatmentCard: React.FC<Props> = ({
  item,
  isDark,
  onToggleSelect,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggleSelect} style={styles.checkbox}>
        <Ionicons
          name={item.isSelected ? "checkbox" : "square-outline"}
          size={20}
          color={item.isSelected ? "#7C3AED" : "#94A3B8"}
        />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Image source={{ uri: item.service.imageUrl }} style={styles.image} />
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.name} numberOfLines={2}>
                {item.service.name}
              </Text>
              <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                <Ionicons name="close" size={16} color={"#64748B"} />
              </TouchableOpacity>
            </View>
            <View style={styles.outlet}>
              <Ionicons name="business" size={12} color={"#7C3AED"} />
              <Text style={styles.outletText} numberOfLines={1}>
                {item.service.location.name}
              </Text>
            </View>
          </View>
        </View>

        {/* Details: Distance + Duration */}
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={12} color={"#64748B"} />
            <Text style={styles.detailText}>
              {item.service.location.district}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={12} color={"#64748B"} />
            <Text style={styles.detailText}>{item.service.duration} menit</Text>
          </View>
        </View>

        {/* Price + Quantity */}
        <View style={styles.action}>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              Rp {(item.service.finalPrice / 1).toLocaleString("id-ID")}
            </Text>
            {item.service.discountPercent > 0 && (
              <View style={styles.discountContainer}>
                <Text style={styles.originalPrice}>
                  Rp {(item.service.normalPrice / 1).toLocaleString("id-ID")}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {item.service.discountPercent} %
                  </Text>
                </View>
              </View>
            )}
          </View>

          <QuantityControls
            quantity={item.qty}
            isDark={isDark}
            onDecrease={() => onUpdateQuantity("reduce")}
            onIncrease={() => onUpdateQuantity("increase")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  checkbox: { marginRight: 12, justifyContent: "flex-start" },
  cardContent: { flex: 1 },
  header: { flexDirection: "row", marginBottom: 12 },
  image: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
    marginRight: 12,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  outlet: { flexDirection: "row", alignItems: "center" },
  outletText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 6,
    fontWeight: "500",
  },
  details: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 6,
    fontWeight: "500",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceRow: { flexDirection: "row", alignItems: "center" },
  currentPrice: { fontSize: 14, fontWeight: "700", color: "#7C3AED" },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#94A3B8",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  discountBadge: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: { fontSize: 10, color: "#DC2626", fontWeight: "700" },
});

export default CartTreatmentCard;
