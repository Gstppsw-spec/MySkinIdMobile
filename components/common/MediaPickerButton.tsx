import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function MediaPickerButton({
  onPickImage,
}: {
  onPickImage: (uri: string) => void;
}) {
  const handlePress = () => {
    Alert.alert("Kirim Gambar", "Pilih sumber gambar", [
      { text: "Kamera", onPress: pickFromCamera },
      { text: "Galeri", onPress: pickFromGallery },
      { text: "Batal", style: "cancel" },
    ]);
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin kamera diperlukan");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      onPickImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin galeri diperlukan");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      onPickImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
      <Ionicons name="camera-outline" size={24} color="#4b5563" />
    </TouchableOpacity>
  );
}
