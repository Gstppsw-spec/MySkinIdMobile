import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddressCardProps {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

export default function AddressCard({
  name,
  phone,
  address,
  note,
}: AddressCardProps) {
  return (
    <View style={styles.card}>
      {/* Header: Name & Phone */}
      <View style={styles.headerRow}>
        {/* <Ionicons name="person-circle-outline" size={22} color="#4B5563" /> */}
        <View style={styles.headerTextWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>

      {/* Address */}
      <View style={styles.row}>
        <Ionicons name="location-outline" size={20} color="#6B7280" />
        <Text style={styles.address}>{address}</Text>
      </View>

      {/* Note */}
      {note && (
        <View style={styles.row}>
          <Ionicons name="document-text-outline" size={18} color="#9CA3AF" />
          <Text style={styles.note}>{note}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTextWrapper: {
    marginLeft: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  phone: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  address: {
    marginLeft: 6,
    color: "#374151",
    fontSize: 14,
    flexShrink: 1,
  },

  note: {
    marginLeft: 6,
    fontSize: 13,
    fontStyle: "italic",
    color: "#6B7280",
    flexShrink: 1,
  },
});
