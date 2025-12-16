import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  activeUntil: string;
  onBack?: () => void;
  onMediaPress?: () => void;
  onRecipePress?: () => void;
}

export default function ConsultationRoomHeader({
  title,
  activeUntil,
  onBack,
  onMediaPress,
  onRecipePress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={26} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Aktif sampai {activeUntil}</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onMediaPress} style={styles.iconBtn}>
          <Ionicons name="images-outline" size={22} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRecipePress} style={styles.iconBtn}>
          <Ionicons name="medkit-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: "#1A122D",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 12,
    color: "#FFF",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 12,
    padding: 4,
  },
});
