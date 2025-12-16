import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterPriceBottomSheet from "../result_category/bottom_sheet_price";
import FilterSortBottomSheet, {
  FilterSortBottomSheetRef,
} from "../result_category/bottom_sheet_sort";
import { useSearchStore } from "@/store/searchStore";
import FilterDistanceBottomSheet, {
  FilterDistanceBottomSheetRef,
} from "../result_category/bottom_sheet_distance";
type TabType = "Product" | "Services" | "Shop";
interface Props {
  onClose: () => void;
  activeTab: TabType;
}

export default function ButtonCategory({ onClose, activeTab }: Props) {
  const sortSheetRef = useRef<FilterSortBottomSheetRef>(null);
  const sortBy = useSearchStore((state) => state.sortBy);
  const setSortBy = useSearchStore((state) => state.setSortBy);
  const setMaxDistance = useSearchStore((state) => state.setMaxDistance);
  const distanceSheetRef = useRef<FilterDistanceBottomSheetRef>(null);

  const handleApplySort = (sort: any) => {
    setSortBy(sort);
  };

  const handleApplyDistance = (maxDistance: number) => {
    setMaxDistance(maxDistance);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={16} color="#5A189A" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ellipsis-horizontal" size={16} color="#000" />
        <Text style={styles.text}>Kategori</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sortSheetRef.current?.present()}
      >
        <Ionicons name="swap-vertical" size={16} color="#000" />
        <Text style={styles.text}>Sort By</Text>
      </TouchableOpacity>

      {activeTab != "Product" && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => distanceSheetRef.current?.present()}
        >
          <Ionicons name="location-outline" size={16} color="#000" />
          <Text style={styles.text}>Jarak</Text>
        </TouchableOpacity>
      )}

      <FilterSortBottomSheet ref={sortSheetRef} onApply={handleApplySort} />
      <FilterDistanceBottomSheet
        ref={distanceSheetRef}
        onApply={handleApplyDistance}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    padding: 15
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    gap: 2,
  },
  text: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginRight: 5,
  },
});
