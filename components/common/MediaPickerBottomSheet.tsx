import React, { useRef, useMemo, useImperativeHandle, forwardRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export interface MediaPickerBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

interface Props {
  onPickImage: (uris: string[]) => void;
}

const MediaPickerBottomSheet = forwardRef<MediaPickerBottomSheetRef, Props>(
  ({ onPickImage }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["25%"], []);

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetRef.current?.present(),
      dismiss: () => bottomSheetRef.current?.dismiss(),
    }));

    const pickFromCamera = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin dibutuhkan",
          "Izinkan akses kamera untuk melanjutkan."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (!result.canceled) {
        onPickImage([result.assets[0].uri]); // kirim array tunggal
        bottomSheetRef.current?.dismiss();
      }
    };

    const pickFromGallery = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin dibutuhkan",
          "Izinkan akses galeri untuk melanjutkan."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        allowsMultipleSelection: true, // ✅ aktifkan multiple select
        selectionLimit: 10, // maksimal 10 gambar
        allowsEditing: false,
      });

      if (!result.canceled) {
        const uris = result.assets.map((asset) => asset.uri);
        onPickImage(uris);
        bottomSheetRef.current?.dismiss();
      }
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.sheetBackground}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={styles.sheetContent}>
          <TouchableOpacity style={styles.option} onPress={pickFromCamera}>
            <Ionicons name="camera-outline" size={24} color="#1A122D" />
            <Text style={styles.optionText}>Ambil dari Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={pickFromGallery}>
            <Ionicons name="image-outline" size={24} color="#1A122D" />
            <Text style={styles.optionText}>Pilih dari Galeri</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default MediaPickerBottomSheet;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#111827",
  },
});
