import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../search/styles";

export default function InitialState() {
  return (
    <View style={styles.initialState}>
      <Ionicons name="sparkles" size={70} color="#E5E5E5" />
      <Text style={styles.initialTitle}>Temukan Treatment Terbaik</Text>
      <Text style={styles.initialSubtitle}>
        Cari treatment kecantikan yang sesuai dengan kebutuhan Anda
      </Text>
      <View style={styles.suggestionChips}>
        {["Facial", "Hair Care", "Body Treatment"].map((t, i) => (
          <TouchableOpacity key={i} style={styles.chip}>
            <Text style={styles.chipText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
