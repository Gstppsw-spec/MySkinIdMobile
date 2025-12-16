import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import useStore from "@/store/useStore";

export default function ConsultationItem({ item }: { item: any }) {
  const router = useRouter();
  const { status, consultationCategory, roomCode, id } = item;
  const setRoomConsultationId = useStore(
    (state) => state.setRoomConsultationId
  );


  const [loading, setLoading] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "#FFA500";
      case "open":
        return "#4CAF50";
      case "closed":
        return "#9E9E9E";
      default:
        return "#2196F3";
    }
  };

  const handleChat = () => {
    setLoading(true);
    setRoomConsultationId(id);
    setTimeout(() => {
      setLoading(false);
      router.push("/consultation/consultation-room");
    }, 1000);
  };

  return (
    <View style={[styles.card, { borderLeftColor: getStatusColor() }]}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{consultationCategory?.name}</Text>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {status.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.desc}>{consultationCategory?.description}</Text>
      <Text style={styles.code}>Room: {roomCode}</Text>

      {/* {status === "open" && ( */}
      <TouchableOpacity
        style={[styles.chatButton, loading && styles.disabledButton]}
        onPress={handleChat}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.chatText}>💬 Lanjutkan Chat</Text>
        )}
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "700", color: "#333" },
  status: { fontSize: 13, fontWeight: "600" },
  desc: { fontSize: 13, color: "#666", marginTop: 4 },
  code: { fontSize: 12, color: "#999", marginTop: 6 },
  chatButton: {
    backgroundColor: "#7B2CBF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
