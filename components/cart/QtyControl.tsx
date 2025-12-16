import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  quantity: number;
  isDark: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControls: React.FC<Props> = ({
  quantity,
  isDark,
  onIncrease,
  onDecrease,
}) => (
  <View style={styles.quantityControls}>
    <TouchableOpacity onPress={onDecrease} disabled={quantity <= 1}>
      <Ionicons
        name="remove-circle-outline"
        size={20}
        color={quantity <= 1 ? "#CBD5E1" :  "#475569"}
      />
    </TouchableOpacity>
    <Text style={[styles.quantityText]}>{quantity}</Text>
    <TouchableOpacity onPress={onIncrease}>
      <Ionicons
        name="add-circle-outline"
        size={20}
        color={isDark ? "#94A3B8" : "#475569"}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  quantityControls: { flexDirection: "row", alignItems: "center" },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 6,
    color: "#1E293B",
  },
});

export default QuantityControls;
