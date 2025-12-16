import React, {
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";

export interface FilterPriceBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

interface Props {
  onApply: (min: number, max: number) => void;
}

const FilterPriceBottomSheet = forwardRef<FilterPriceBottomSheetRef, Props>(
  ({ onApply }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["50%"], []);
    const [minPrice, setMinPrice] = useState(100000);
    const [maxPrice, setMaxPrice] = useState(1000000);

    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetModalRef.current?.present();
      },
      dismiss: () => {
        bottomSheetModalRef.current?.dismiss();
      },
    }));

    const handleApply = () => {
      onApply(minPrice, maxPrice);
      bottomSheetModalRef.current?.dismiss();
    };

    const handleMinPriceChange = (value: number) => {
      if (value <= maxPrice) {
        setMinPrice(value);
      }
    };

    const handleMaxPriceChange = (value: number) => {
      if (value >= minPrice) {
        setMaxPrice(value);
      }
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

          <View style={styles.inputWrapper}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Minimum</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currency}>Rp</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={minPrice.toString()}
                  onChangeText={(val) => handleMinPriceChange(Number(val) || 0)}
                />
              </View>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Maksimum</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currency}>Rp</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={maxPrice.toString()}
                  onChangeText={(val) => handleMaxPriceChange(Number(val) || 0)}
                />
              </View>
            </View>
          </View>

          {/* Sliders */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Harga Minimum: Rp {minPrice.toLocaleString()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5000000}
              step={50000}
              value={minPrice}
              minimumTrackTintColor="#9B5DE5"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#9B5DE5"
              onValueChange={handleMinPriceChange}
            />
            
            <Text style={styles.sliderLabel}>Harga Maksimum: Rp {maxPrice.toLocaleString()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000000}
              step={50000}
              value={maxPrice}
              minimumTrackTintColor="#9B5DE5"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#9B5DE5"
              onValueChange={handleMaxPriceChange}
            />
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>TERAPKAN</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FilterPriceBottomSheet;

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currency: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
  },
  separator: {
    width: 1,
    height: "80%",
    backgroundColor: "#DDD",
    marginHorizontal: 16,
    alignSelf: "center",
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  selectedRange: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#9B5DE5",
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#9B5DE5",
    paddingVertical: 10,
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