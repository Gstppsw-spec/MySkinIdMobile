import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import ConsultationItem from "./consultationItem";

interface Props {
  data: any[];
  isLoading: boolean;
  onRefetch: () => void;
}

export default function ConsultationList({
  data,
  isLoading,
  onRefetch,
}: Props) {
  const [activeTab, setActiveTab] = useState<"pending" | "open" | "closed">(
    "open"
  );

  const filteredData = data.filter((item) => item.status === activeTab);

  const renderTab = (label: string, value: "pending" | "open" | "closed") => (
    <TouchableOpacity
      key={value}
      style={[styles.tabButton, activeTab === value && styles.tabActive]}
      onPress={() => setActiveTab(value)}
    >
      <Text
        style={[styles.tabText, activeTab === value && styles.tabTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ===== Tabs ===== */}
      <View style={styles.tabContainer}>
        {renderTab("Pending", "pending")}
        {renderTab("Open", "open")}
        {renderTab("Closed", "closed")}
      </View>

      {/* ===== List ===== */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ConsultationItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefetch} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Tidak ada konsultasi{" "}
            {activeTab === "pending"
              ? "menunggu"
              : activeTab === "open"
              ? "terbuka"
              : "yang sudah selesai"}
            .
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#F1E9FF",
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: "#7B2CBF",
  },
  tabText: {
    color: "#7B2CBF",
    fontWeight: "600",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
});
