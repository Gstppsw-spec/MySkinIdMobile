import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useConsultationRoomByUserId } from "@/api/consultation";
import RequiredLogin from "@/components/required/required_login";
import ConsultationHeader from "@/components/header/consultationHeader";
import ConsultationList from "@/components/consultation/consultationList";
import DataStateView from "@/components/common/DataStateView";

export default function ConsultationScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const customerId = useAuthStore((state) => state.customerId);

  const { data, isLoading, isError, refetch } = useConsultationRoomByUserId(
    customerId || undefined
  );

  if (!customerId) return <RequiredLogin />;

  const hasData = data && data?.length > 0;
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#F8F8F8" : "#F8F8F8" },
      ]}
    >
      <ConsultationHeader title="My Consultation" />

      <DataStateView
        isLoading={isLoading}
        isError={isError}
        data={data}
        onRetry={refetch}
        emptyMessage="Belum ada konsultasi."
        message="Segera konsultasikan masalah kulitmu dengan ahlinya untuk mendapatkan solusi yang tepat."
      />

      {!isLoading && !isError && hasData && (
        <ConsultationList
          data={data}
          isLoading={isLoading}
          onRefetch={refetch}
        />
      )}

      {!isLoading && !isError && !hasData && (
        <View style={styles.centerContent}>
          <TouchableOpacity
            onPress={() => router.push("/consultation")}
            style={styles.startButton}
          >
            <Text style={styles.startText}>Mulai Konsultasi</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { paddingHorizontal: 16, marginBottom: 8, marginTop: 10 },
  startButton: {
    backgroundColor: "#6C1FC7",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  startText: { color: "#fff", fontWeight: "700" },
});
