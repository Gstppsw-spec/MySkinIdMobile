import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

const HeaderHome = ({
  border = 20,
  margin = 16,
  background = "transparent",
}: any) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={background}
        barStyle={"dark-content"}
      />

      <View
        style={[
          styles.headerWrapper,
          {
            backgroundColor: isDark
              ? "rgba(30, 30, 30, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            marginHorizontal: margin,
            borderRadius: border,
            borderColor: isDark
              ? "rgba(155, 93, 229, 0.3)"
              : "rgba(155, 93, 229, 0.2)",
            borderWidth: 1,
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.locationButton,
              {
                backgroundColor: isDark
                  ? "rgba(155, 93, 229, 0.15)"
                  : "rgba(155, 93, 229, 0.08)",
              },
            ]}
            onPress={() => router.push("/filter_location")}
          >
            <Ionicons
              name="location-outline"
              size={18}
              color={isDark ? "#E9E4F0" : "#9B5DE5"}
            />
            <Text
              style={[
                styles.locationText,
                { color: isDark ? "#E9E4F0" : "#5A189A" },
              ]}
            >
              Near Me
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={isDark ? "#E9E4F0" : "#5A189A"}
            />
          </TouchableOpacity>

          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDark
                    ? "rgba(155, 93, 229, 0.15)"
                    : "rgba(155, 93, 229, 0.08)",
                },
              ]}
              onPress={() => router.push("/search")}
            >
              <Ionicons
                name="search-outline"
                size={22}
                color={isDark ? "#E9E4F0" : "#9B5DE5"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDark
                    ? "rgba(155, 93, 229, 0.15)"
                    : "rgba(155, 93, 229, 0.08)",
                },
              ]}
              onPress={() => router.push("/cart")}
            >
              <Ionicons
                name="cart-outline"
                size={22}
                color={isDark ? "#E9E4F0" : "#9B5DE5"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  headerWrapper: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    left: 0,
    right: 0,
    zIndex: 999,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    backdropFilter: "blur(10px)", // Untuk efek glassmorphism (browser)
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  locationText: {
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 2,
  },
});
