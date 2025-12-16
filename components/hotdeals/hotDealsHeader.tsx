import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const HotDealsHeader: React.FC<Props> = ({
  title,
  onViewAll,
  showViewAll = true,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity style={styles.all} onPress={onViewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={18} color="#D4B896" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerDivider} />
    </View>
  );
};

export default HotDealsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 14,
    marginVertical: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2C2C2C",
  },
  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#D4B896",
    borderRadius: 2,
    marginTop: 8,
  },
  all: { flexDirection: "row", alignItems: "center" },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D4B896",
    marginRight: 4,
  },
});
