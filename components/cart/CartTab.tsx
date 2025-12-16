import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartTabsProps {
  activeTab: "product" | "service";
  setActiveTab: (tab: "product" | "service") => void;
  isDark?: boolean;
  productCount?: number;
  serviceCount?: number;
}

export default function CartTab({
  activeTab,
  setActiveTab,
  isDark = false,
  productCount = 0,
  serviceCount = 0,
}: CartTabsProps) {
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const indicatorTranslate = useRef(new Animated.Value(0)).current;

  const tabs = [
    {
      key: "product",
      label: "Produk",
      icon: "cube-outline",
      count: productCount,
    },
    {
      key: "service",
      label: "Layanan",
      icon: "medical-outline",
      count: serviceCount,
    },
  ];

  // Animasi indikator
  useEffect(() => {
    if (wrapperWidth > 0) {
      const tabWidth = wrapperWidth / tabs.length;
      Animated.timing(indicatorTranslate, {
        toValue: activeTab === "product" ? 0 : tabWidth,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab, wrapperWidth]);

  return (
    <View style={[styles.tabContainer]}>
      <View
        style={styles.tabWrapper}
        onLayout={(e: LayoutChangeEvent) =>
          setWrapperWidth(e.nativeEvent.layout.width)
        }
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key as any)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={
                    isActive
                      ?  "#7C3AED"
                      :  "#94A3B8"
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </View>

              <View style={[styles.tabBadge]}>
                <Text
                  style={[
                    styles.tabBadgeText,
                    isActive && styles.tabBadgeTextActive,
                  ]}
                >
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Animated Indicator */}
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              width: wrapperWidth / tabs.length,
              transform: [{ translateX: indicatorTranslate }],
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    elevation: 2,
  },
  tabContainerDark: {
    backgroundColor: "#1E1B2E",
    borderBottomColor: "#2D2A40",
  },
  tabWrapper: {
    flexDirection: "row",
    position: "relative",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 14,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748B",
    marginLeft: 8,
  },
  activeTabText: { color: "#7C3AED", fontWeight: "600" },
  activeTabTextDark: { color: "#8B5CF6" },
  textDark: { color: "#94A3B8" },
  tabBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  tabBadgeDark: { backgroundColor: "#2D2A40" },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  tabBadgeTextActive: { color: "#7C3AED" },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#7C3AED",
  },
  tabIndicatorDark: { backgroundColor: "#8B5CF6" },
});
