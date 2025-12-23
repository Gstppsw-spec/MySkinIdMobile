import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import SkinAnalysImagePicker from "./SkinAnalysImagePicker";

export default function SkinAnalysActionButton({
  hasData,
  customerId,
  canAnalyze,
  remainingDays,
  remainingHours,
}: {
  hasData: boolean;
  customerId: string;
  canAnalyze: boolean;
  remainingDays: number;
  remainingHours: number;
}) {
  const [open, setOpen] = useState(false);

  const disabled = hasData && !canAnalyze;

  return (
    <>
      <View style={styles.wrapper}>
        {disabled && (
          <Text style={styles.cooldownText}>
            Kamu bisa melakukan analisa ulang dalam
            <Text style={styles.bold}>
              {remainingDays > 0
                ? ` ${remainingDays} hari ${remainingHours} jam`
                : `${remainingHours} jam`}
            </Text>
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => setOpen(true)}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <Ionicons
            name="scan-outline"
            size={20}
            color={disabled ? "#E5E7EB" : "#FFF"}
          />
          <Text style={[styles.text, disabled && { color: "#E5E7EB" }]}>
            {hasData ? "Analisa Ulang" : "Mulai Skin Analysis"}
          </Text>
        </TouchableOpacity>
      </View>

      <SkinAnalysImagePicker
        visible={open}
        onClose={() => setOpen(false)}
        customerId={customerId}
      />
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cooldownText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "700",
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#6C1FC7",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  disabledButton: {
    backgroundColor: "#CBD5E1",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
