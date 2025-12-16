import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderDetailProps {
  clinicId: string | any;
  clinicName: string;
  headerBackground: string;
  iconColor: string;
  buttonBackground: string;
  showClinicName: boolean;
  handleFavorite?: () => void;
  isFavorite?: boolean;
}

export default function HeaderDetail({
  clinicId,
  headerBackground,
  iconColor,
  buttonBackground,
  clinicName,
  showClinicName,
  handleFavorite,
  isFavorite,
}: HeaderDetailProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: headerBackground,
        zIndex: 1000,
      }}
    >
      {/* Left Section - Back Button */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 15 }}
        >
          <View
            style={{
              backgroundColor: buttonBackground,
              padding: 8,
              borderRadius: 20,
            }}
          >
            <Ionicons name="arrow-back" color={iconColor} size={20} />
          </View>
        </TouchableOpacity>
        {showClinicName && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#000",
            }}
            numberOfLines={1}
          >
            {clinicName}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={handleFavorite}>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.35)",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 2,
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              color={isFavorite ? "red" : iconColor}
              size={22}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cart")}>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.35)",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 2,
            }}
          >
            <Ionicons name="cart-outline" color={iconColor} size={22} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
