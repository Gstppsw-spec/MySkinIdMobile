import React, { useState } from "react";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import TreatmentCard from "../treatment/treatmentCard";
import { useServiceByLocationId, useServices } from "@/api/service";
import DataStateView from "../common/DataStateView";

interface ServiceTabsProps {
  clinicId: string | any;
}

export default function ServiceTabs({ clinicId }: ServiceTabsProps) {
  const [search, setSearch] = useState("");

  const {
    data: services,
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = useServiceByLocationId(clinicId);

  const isLoadingState = isLoading || isRefetching;

  return (
    <View style={styles.container}>
      <DataStateView
        isLoading={isLoadingState}
        isError={isError}
        data={services}
        onRetry={refetch}
        emptyMessage="Tidak ada layanan tersedia."
      />
      {services && services.length > 0 && (
        <>
          <View style={styles.servicesContainer}>
            <TextInput
              style={styles.search}
              placeholder="Search service..."
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={services}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <TreatmentCard item={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  search: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeTab: {
    backgroundColor: "#7B2CBF",
    borderColor: "#7B2CBF",
  },
  tabText: {
    fontWeight: "600",
    color: "#555",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
  },
  servicesContainer: {
    paddingBottom: 40,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7B2CBF",
  },
  serviceDesc: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceDuration: {
    fontSize: 13,
    color: "#999",
  },
  bookButton: {
    backgroundColor: "#7B2CBF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
