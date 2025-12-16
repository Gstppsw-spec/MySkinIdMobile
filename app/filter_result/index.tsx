import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import HeaderDefault from "@/components/HeaderDefault";
import ListFilter from "@/components/result_category/list_filter";
import FilterPriceBottomSheet, {
  FilterPriceBottomSheetRef,
} from "@/components/result_category/bottom_sheet_price";
import FilterDistanceBottomSheet, {
  FilterDistanceBottomSheetRef,
} from "@/components/result_category/bottom_sheet_distance";
import FilterSortBottomSheet, {
  FilterSortBottomSheetRef,
} from "@/components/result_category/bottom_sheet_sort";

// Definisikan tipe untuk filter
interface FilterItem {
  id: number;
  name: string;
}

const list_filter: FilterItem[] = [
  {
    id: 1,
    name: "Sort",
  },
  {
    id: 2,
    name: "Category",
  },
  {
    id: 3,
    name: "Price",
  },
  {
    id: 4,
    name: "Distance",
  },
];

export default function ResultFilter() {
  const bottomSheetRef = useRef<FilterPriceBottomSheetRef>(null);
  const distanceSheetRef = useRef<FilterDistanceBottomSheetRef>(null);
  const sortSheetRef = useRef<FilterSortBottomSheetRef>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: any;
  }>({});

  const handleApplyPrice = (min: number, max: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      price: { min, max },
    }));
  };

  const handleShowSheet = (id: number) => {
    if (id === 3) {
      bottomSheetRef.current?.present();
    } else if (id == 4) {
      distanceSheetRef.current?.present();
    } else if (id == 1) {
      sortSheetRef.current?.present();
    } else {
      router.push("/filter_category_all");
    }
  };

  const handleApplyDistance = (maxDistance: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      distance: { maxDistance },
    }));
  };

  const handleApplySort = (sort: any) => {
    setSelectedFilters((prev) => ({
      ...prev,
      sort: { sort },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5F0" />
      <HeaderDefault />
      <ListFilter list_filter={list_filter} onPricePress={handleShowSheet} />
      <FilterPriceBottomSheet ref={bottomSheetRef} onApply={handleApplyPrice} />
      <FilterDistanceBottomSheet
        ref={distanceSheetRef}
        onApply={handleApplyDistance}
      />
      <FilterSortBottomSheet ref={sortSheetRef} onApply={handleApplySort} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
