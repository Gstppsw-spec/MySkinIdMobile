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
import Slider from "@react-native-community/slider";

export interface FilterDistanceBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

interface Props {
  onApply: (maxDistance: number) => void;
}

const FilterDistanceBottomSheet = forwardRef<
  FilterDistanceBottomSheetRef,
  Props
>(({ onApply }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const [maxDistance, setMaxDistance] = useState(5);

  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetModalRef.current?.present();
    },
    dismiss: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  const handleApply = () => {
    onApply(maxDistance);
    bottomSheetModalRef.current?.dismiss();
  };

  const handleDistanceChange = (value: number) => {
    setMaxDistance(value);
  };

  const getDistanceLabel = (distance: number) => {
    if (distance === 0) return "Di tempat ini saja";
    if (distance === 50) return "Semua jarak";
    return `${distance} km`;
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
        <View style={styles.distanceDisplay}>
          <Text style={styles.distanceValue}>
            {getDistanceLabel(maxDistance)}
          </Text>
          {maxDistance > 0 && maxDistance < 50 && (
            <Text style={styles.distanceUnit}>kilometer</Text>
          )}
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={50}
            step={1}
            value={maxDistance}
            minimumTrackTintColor="#9B5DE5"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#9B5DE5"
            onValueChange={handleDistanceChange}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>0 km</Text>
            <Text style={styles.sliderLabel}>10 km</Text>
            <Text style={styles.sliderLabel}>20 km</Text>
            <Text style={styles.sliderLabel}>30 km</Text>
            <Text style={styles.sliderLabel}>40 km</Text>
            <Text style={styles.sliderLabel}>50+ km</Text>
          </View>
        </View>

        <View style={styles.quickOptions}>
          <Text style={styles.quickOptionsTitle}>Pilihan Cepat:</Text>
          <View style={styles.quickOptionsContainer}>
            {[1, 3, 5, 10, 25].map((distance) => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.quickOption,
                  maxDistance === distance && styles.quickOptionSelected,
                ]}
                onPress={() => setMaxDistance(distance)}
              >
                <Text
                  style={[
                    styles.quickOptionText,
                    maxDistance === distance && styles.quickOptionTextSelected,
                  ]}
                >
                  {distance} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>TERAPKAN JARAK</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FilterDistanceBottomSheet;

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
  },
  distanceDisplay: {
    alignItems: "center",
    marginBottom: 22,
    paddingVertical: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#9B5DE5",
    borderStyle: "dashed",
  },
  distanceValue: {
    fontSize: 25,
    fontWeight: "700",
    color: "#9B5DE5",
    marginBottom: 4,
  },
  distanceUnit: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  sliderContainer: {
    marginBottom: 24,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  quickOptions: {
    marginBottom: 24,
  },
  quickOptionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  quickOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  quickOptionSelected: {
    backgroundColor: "#9B5DE5",
    borderColor: "#9B5DE5",
  },
  quickOptionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  quickOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#9B5DE5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
