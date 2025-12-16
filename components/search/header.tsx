import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabType = "Product" | "Services" | "Shop";

interface Props {
  query: string;
  onSearch: (text: string) => void;
  onClear: () => void;
  onBack: () => void;
  onChooseLocation: () => void;
  activeTab: TabType;
}

export default function Header({
  query,
  onSearch,
  onClear,
  onBack,
  onChooseLocation,
  activeTab,
}: Props) {
  const [focused, setFocused] = useState(false);
  const anim = useRef(new Animated.Value(0)).current; // 0 = tidak fokus, 1 = fokus

  useEffect(() => {
    Animated.timing(anim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const searchWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: activeTab === "Product" ? ["100%", "100%"] : ["25%", "100%"],
  });

  const locationWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["75%", "0%"],
  });

  const locationOpacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.3, 0],
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
          <Ionicons name="search" size={20} color="#7C3AED" />
          <TextInput
            style={styles.input}
            placeholder="Cari"
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={onSearch}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={onClear}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </Animated.View>

        {activeTab !== "Product" && (
          <Animated.View
            style={[
              styles.locationWrapper,
              { width: locationWidth, opacity: locationOpacity },
            ]}
          >
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={onChooseLocation}
              activeOpacity={0.8}
            >
              <Ionicons name="location" size={16} color="#7C3AED" />
              <Text style={styles.locationText}>Pilih Lokasi</Text>
              <Ionicons name="chevron-down" size={14} color="#7C3AED" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    // paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  input: {
    color: "#000",
    fontSize: 15,
    marginLeft: 6,
    flex: 1,
  },
  locationWrapper: {
    marginLeft: 10,
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginRight: 10,
  },
  locationText: {
    color: "#7C3AED",
    fontSize: 14,
    marginHorizontal: 4,
    fontWeight: "500",
  },
});
