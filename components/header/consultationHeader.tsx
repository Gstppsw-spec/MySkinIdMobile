import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface Props {
  title: string;
}

export default function ConsultationHeader({ title }: Props) {
  const isDark = useColorScheme() === "dark";
  const color = isDark ? "#fff" : "#000";
  const headerColor = isDark ? "#1A122D" : "#fff";
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#1A122D" />
      <View
        style={{
          backgroundColor: headerColor,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color,
            }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <TouchableOpacity style={{ marginHorizontal: 8 }}>
              <Ionicons name="heart-outline" size={22} color={color} />
            </TouchableOpacity> */}
            <TouchableOpacity style={{ marginHorizontal: 8 }}>
              <Ionicons name="notifications-outline" size={22} color={color} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 8 }}
              onPress={() => router.push("/cart")}
            >
              <Ionicons name="cart-outline" size={22} color={color} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
