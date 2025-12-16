import React, {
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export interface BottomSheetPickerRef {
  present: () => void;
  dismiss: () => void;
}

interface BottomSheetPickerProps {
  label: React.ReactNode;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
  error?: string;
}

const BottomSheetPicker = forwardRef<
  BottomSheetPickerRef,
  BottomSheetPickerProps
>(({ label, selectedValue, onValueChange, options, disabled, error }, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const [searchText, setSearchText] = useState("");

  useImperativeHandle(ref, () => ({
    present: () => modalRef.current?.present(),
    dismiss: () => modalRef.current?.dismiss(),
  }));

  const handleOpen = () => {
    if (!disabled) modalRef.current?.present();
  };

  // 🔍 FILTER OPTION BERDASARKAN SEARCH
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((item: any) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, options]);

  const renderOptions = () => {
    if (filteredOptions?.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Data tidak ditemukan</Text>
        </View>
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {filteredOptions?.map((item: any) => (
          <TouchableOpacity
            key={item?.code}
            style={[
              styles.option,
              selectedValue === item?.name && styles.optionSelected,
            ]}
            onPress={() => {
              onValueChange(item);
              modalRef.current?.dismiss();
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedValue === item?.name && styles.optionTextSelected,
              ]}
            >
              {item?.name}
            </Text>

            {selectedValue === item?.name && (
              <View style={styles.selectedIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>

      {/* Picker Trigger */}
      <TouchableOpacity
        style={[
          styles.pickerWrapper,
          disabled && styles.pickerDisabled,
          error && styles.pickerError,
          selectedValue && styles.pickerSelected,
        ]}
        onPress={handleOpen}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text
          style={[
            styles.pickerText,
            !selectedValue && styles.pickerPlaceholder,
            disabled && styles.pickerTextDisabled,
          ]}
        >
          {selectedValue || "Pilih..."}
        </Text>

        <Ionicons name="chevron-down" size={18} color="#6B7280" />
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}
      <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
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
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>
              Pilih {typeof label === "string" ? label : "Option"}
            </Text>

            <TouchableOpacity
              onPress={() => modalRef.current?.dismiss()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Cari..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>
          <View style={styles.optionsScrollContainer}>{renderOptions()}</View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

export default BottomSheetPicker;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 15,
    color: "#111827",
  },

  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pickerSelected: {
    borderColor: "#8B5CF6",
    backgroundColor: "#F5F3FF",
  },

  pickerDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },

  pickerError: {
    borderColor: "#EF4444",
  },

  pickerText: {
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },

  pickerPlaceholder: {
    color: "#9CA3AF",
  },

  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
  },

  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  bottomSheetTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  closeButton: {
    padding: 4,
  },

  /* 🔍 Search */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },

  optionsScrollContainer: {
    flex: 1,
  },

  optionsContainer: {
    paddingBottom: 40,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  optionSelected: {
    backgroundColor: "#F5F3FF",
  },

  optionText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },

  optionTextSelected: {
    color: "#7C3AED",
    fontWeight: "600",
  },

  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7C3AED",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },

  pickerTextDisabled: {
    color: "#9CA3AF",
  },

  chevron: {
    color: "#6B7280",
    fontSize: 12,
    marginLeft: 10,
  },

  errorContainer: { marginTop: 6 },
  errorText: { color: "#EF4444", fontSize: 12, fontWeight: "500" },

  bottomSheetContent: {
    flex: 1,
  },
});
