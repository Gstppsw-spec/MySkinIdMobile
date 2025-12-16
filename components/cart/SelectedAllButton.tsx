import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  cartItems: any[];
  selectedItems: any[];
  onPress: () => void;
  onDeleteAll: () => void;
}

const SelectAllButton: React.FC<Props> = ({
  cartItems,
  selectedItems,
  onPress,
  onDeleteAll
}) => {
  const allSelected = cartItems.every((item) => item.isSelected);
  return (
    <View style={styles.selectAllContainer}>
      <TouchableOpacity style={styles.selectAllButton} onPress={onPress}>
        <Ionicons
          name={allSelected ? "checkbox" : "square-outline"}
          size={20}
          color={allSelected ? "#7C3AED" : "#64748B"}
        />
        <Text style={styles.selectAllText}>
          Pilih Semua ({selectedItems.length}/{cartItems.length})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selectAllButton} onPress={onDeleteAll}>
        <Ionicons
          name={"trash-outline"}
          size={20}
          color={allSelected ? "#7C3AED" : "#64748B"}
        />
        <Text style={styles.selectAllText}>Hapus Semua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectAllContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectAllButton: { flexDirection: "row", alignItems: "center" },
  selectAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 12,
  },
});

export default SelectAllButton;
