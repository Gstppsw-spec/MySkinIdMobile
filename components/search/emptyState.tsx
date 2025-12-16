import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../search/styles";

export default function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={80} color="#E5E5E5" />
      <Text style={styles.emptyTitle}>Treatment tidak ditemukan</Text>
      <Text style={styles.emptySubtitle}>
        Coba kata kunci lain atau jelajahi kategori yang berbeda
      </Text>
      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Jelajahi Semua Treatment</Text>
      </TouchableOpacity>
    </View>
  );
}
