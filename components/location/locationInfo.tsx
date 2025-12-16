import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ClinicInfoProps {
  clinic: {
    name: string;
    address: string;
    distance: string | number;
    rating: number;
    reviewCount: number;
    serviceCount: number;
  };
}

export default function ClinicInfo({ clinic }: ClinicInfoProps) {

  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={2}>
        {clinic.name}
      </Text>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={14} color="#7C3AED" />
          <Text style={styles.sectionTitle}>Alamat</Text>
        </View>
        <Text style={styles.addressText}>{clinic?.address}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Ionicons name="star" size={12} color="#FACC15" />
            <Text style={styles.statValue}>5</Text>
            {/* <Text style={styles.statValue}>{clinic.rating.toFixed(1)}</Text> */}
          </View>
          <Text style={styles.statLabel}>(50)</Text>
          {/* <Text style={styles.statLabel}>({clinic?.reviewCount})</Text> */}
        </View>

        {/* Distance */}
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Ionicons name="navigate-outline" size={12} color="#7C3AED" />
            <Text style={styles.statValue}>5</Text>
            {/* <Text style={styles.statValue}>{clinic?.distance}</Text> */}
          </View>
          <Text style={styles.statLabel}>km</Text>
        </View>

        {/* Services */}
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Ionicons name="briefcase-outline" size={12} color="#10B981" />
            <Text style={styles.statValue}>5</Text>
            {/* <Text style={styles.statValue}>{clinic?.serviceCount}</Text> */}
          </View>
          <Text style={styles.statLabel}>Layanan</Text>
        </View>
      </View>

      {/* Badge untuk rating tinggi */}
      {/* {clinic?.rating >= 4.5 && ( */}
      <View style={styles.excellenceBadge}>
        <Ionicons name="trophy-outline" size={10} color="#FFFFFF" />
        <Text style={styles.excellenceText}>Excellent</Text>
      </View>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    lineHeight: 20,
    marginTop: 10
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginLeft: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  addressText: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 16,
    marginLeft: 20, // Sesuai dengan icon location
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2937",
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E5E7EB",
  },
  excellenceBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  excellenceText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
