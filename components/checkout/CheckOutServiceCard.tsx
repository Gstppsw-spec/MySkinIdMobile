import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: any;
}

const CheckOutServiceCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Image source={{ uri: item.imageOutlet }} style={styles.image} />
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
            </View>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              {item.quantity} Item
            </Text>
            <View style={styles.outlet}>
              <Ionicons name="business" size={12} color={"#7C3AED"} />
              <Text style={styles.outletText} numberOfLines={1}>
                {item.outletName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={12} color={"#64748B"} />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={12} color={"#64748B"} />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
        </View>
        <View style={styles.action}>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              Rp {item.priceDiscount.toLocaleString("id-ID")}
            </Text>
            <View style={styles.discountContainer}>
              <Text style={styles.originalPrice}>
                Rp {item.price.toLocaleString("id-ID")}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round((1 - item.priceDiscount / item.price) * 100)}%
                </Text>
              </View>
            </View>
          </View>
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

export default CheckOutServiceCard;
