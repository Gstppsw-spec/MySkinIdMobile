import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderDetailProps {
  title?: string;
  handleFavorite?: () => void;
  isFavorite?: boolean;
}
const TreatmentDetailHeader = ({
  title,
  isFavorite,
  handleFavorite,
}: HeaderDetailProps) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={18} color="#fff" />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.title}>
        {/* {title} */}
      </Text>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton} onPress={handleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "red" : "#fff"}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1000,

    padding: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TreatmentDetailHeader;
