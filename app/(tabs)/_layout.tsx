import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontWeight: focused ? "700" : "500",
                fontSize: 11,
              }}
            >
              {focused ? "Home" : "Home"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              size={size}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="consultation"
        options={{
          title: "My Care",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontWeight: focused ? "700" : "500",
                fontSize: 11,
              }}
            >
              {focused ? "Consultation" : "Consultation"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="skin_analys"
        options={{
          title: "Skin Analys",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontWeight: focused ? "900" : "500",
                fontSize: 11,
              }}
            >
              {focused ? "Skin Analys" : "Skin Analys"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "scan" : "scan-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontWeight: focused ? "700" : "500",
                fontSize: 11,
              }}
            >
              {focused ? "Favorite" : "Favorite"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontWeight: focused ? "700" : "500",
                fontSize: 11,
              }}
            >
              {focused ? "Profile" : "Profile"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
