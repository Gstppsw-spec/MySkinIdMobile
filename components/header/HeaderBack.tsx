import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderBackProps {
  title?: string;
  rightContent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  border?: boolean;
}

export default function HeaderBack({
  title,
  rightContent,
  backgroundColor = "#fff",
  textColor = "#111827",
  border = true,
}: HeaderBackProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {/* Tambah StatusBar agar warna bar sinkron */}
      <StatusBar
        barStyle={textColor === "#fff" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <View
        style={[
          styles.header,
          {
            borderBottomWidth: border ? 1 : 0,
            borderBottomColor: border ? "#E5E7EB" : "transparent",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={textColor} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightArea}>
          {rightContent ? rightContent : <View style={{ width: 24 }} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: "#2B1D4A",
  },
  rightArea: {
    minWidth: 24,
    alignItems: "flex-end",
  },
});
