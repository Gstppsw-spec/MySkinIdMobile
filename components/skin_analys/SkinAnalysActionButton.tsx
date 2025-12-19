import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import SkinAnalysImagePicker from "./SkinAnalysImagePicker";

export default function SkinAnalysActionButton({
  hasData,
    customerId
}: {
  hasData: boolean;
  customerId: string;

}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="scan-outline" size={20} color="#FFF" />
        <Text style={styles.text}>
          {hasData ? "Analisa Ulang" : "Mulai Skin Analysis"}
        </Text>
      </TouchableOpacity>

      <SkinAnalysImagePicker
        visible={open}
        onClose={() => setOpen(false)}
        customerId={customerId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 16,
    backgroundColor: "#6C1FC7",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
