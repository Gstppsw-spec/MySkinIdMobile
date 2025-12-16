import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View
      style={{
        padding: 12,
        paddingHorizontal: 16,
        backgroundColor: "#28C76F",
        borderRadius: 12,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons name="checkmark-circle" size={24} color="#fff" />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "#f1f1f1", fontSize: 13 }}>{text2}</Text>
        ) : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View
      style={{
        padding: 12,
        paddingHorizontal: 16,
        backgroundColor: "#EA5455",
        borderRadius: 12,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons name="close-circle" size={24} color="#fff" />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "#f7f7f7", fontSize: 13 }}>{text2}</Text>
        ) : null}
      </View>
    </View>
  ),

  info: ({ text1, text2 }: any) => (
    <View
      style={{
        padding: 12,
        paddingHorizontal: 16,
        backgroundColor: "#00CFE8",
        borderRadius: 12,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons name="information-circle" size={24} color="#fff" />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "#fafafa", fontSize: 13 }}>{text2}</Text>
        ) : null}
      </View>
    </View>
  ),
};
