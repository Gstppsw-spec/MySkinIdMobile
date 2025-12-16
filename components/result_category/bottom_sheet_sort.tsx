import React, {
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export interface FilterSortBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

interface Props {
  onApply: (selectedSort: string) => void;
}

// Tipe data untuk opsi sorting
type SortOption = {
  id: string;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const FilterSortBottomSheet = forwardRef<FilterSortBottomSheetRef, Props>(
  ({ onApply }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["55%"], []);
    
    const [selectedSort, setSelectedSort] = useState<string>("recommended");

    const sortOptions: SortOption[] = [
      {
        id: "recommended",
        label: "Direkomendasikan",
        description: "Pilihan terbaik untuk Anda",
        icon: "star",
      },
      {
        id: "nearest",
        label: "Paling Dekat",
        description: "Berdasarkan jarak terdekat",
        icon: "location",
      },
      {
        id: "price_high_low",
        label: "By Price (High to Low)",
        description: "Harga tertinggi ke terendah",
        icon: "arrow-down",
      },
      {
        id: "price_low_high",
        label: "By Price (Low to High)",
        description: "Harga terendah ke tertinggi",
        icon: "arrow-up",
      },
      {
        id: "rating",
        label: "By Rating (Highest First)",
        description: "Rating tertinggi lebih dulu",
        icon: "trending-up",
      },
    ];

    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetModalRef.current?.present();
      },
      dismiss: () => {
        bottomSheetModalRef.current?.dismiss();
      },
    }));

    const handleApply = () => {
      onApply(selectedSort);
      bottomSheetModalRef.current?.dismiss();
    };

    const handleSelectSort = (sortId: string) => {
      setSelectedSort(sortId);
    };

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.optionsContainer}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  selectedSort === option.id && styles.optionItemSelected,
                ]}
                onPress={() => handleSelectSort(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      selectedSort === option.id &&
                        styles.iconContainerSelected,
                    ]}
                  >
                    <Ionicons
                      name={option.icon}
                      size={16}
                      color={selectedSort === option.id ? "#FFFFFF" : "#9B5DE5"}
                    />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text
                      style={[
                        styles.optionLabel,
                        selectedSort === option.id &&
                          styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedSort === option.id && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedSort === option.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>TERAPKAN FILTER</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FilterSortBottomSheet;

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionItemSelected: {
    backgroundColor: "#F3EBFF",
    borderColor: "#9B5DE5",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F3EBFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconContainerSelected: {
    backgroundColor: "#9B5DE5",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: "#9B5DE5",
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
    fontWeight: "400",
  },
  radioContainer: {
    marginLeft: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#9B5DE5",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9B5DE5",
  },
  applyButton: {
    backgroundColor: "#9B5DE5",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
