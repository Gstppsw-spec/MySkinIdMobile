import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import InputOtp from "@/components/authentication/inputOtp";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { userResendVerificationCode, useVerificationCode } from "@/api";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useAuthStore } from "@/store/authStore";

export default function VerificationOtp() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      router.replace("/(tabs)");
    }
  }, [token]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { customerId }: any = useLocalSearchParams();

  const verifyMutation = useVerificationCode();
  const resendVerificationMutation = userResendVerificationCode();

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    const code = otp.join("");
    if (code?.length != 6) {
      Toast.show({
        type: "error",
        text1: "OTP harus 6 digit",
      });
      return;
    }

    const payload = {
      customerId: customerId,
      otp: code,
    };

    verifyMutation.mutate(payload, {
      onSuccess: (res) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "OTP Benar, kamu berhasil login",
        });
        router.push("/(tabs)");
      },
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: err.response?.data?.message || "Terjadi kesalahan",
        });
      },
    });
  };

  const handleResend = () => {
    if (!canResend) return;
    const payload = {
      customerId: customerId,
    };

    resendVerificationMutation.mutate(payload, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "OTP berhasil dikirim ulang",
        });
      },
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: "Login Gagal",
          text2: err.response?.data?.message || "Terjadi kesalahan",
        });
      },
    });

    setTimer(30);
    setCanResend(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK BUTTON */}
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 60, zIndex: 999, left: 20 }}
      >
        <Ionicons name="close" color={"#000"} size={20} />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Masukkan Kode Verifikasi</Text>
        <Text style={styles.subtitle}>
          6-digit Kode OTP telah dikirim ke Email kamu.
        </Text>

        {/* OTP INPUT */}
        <InputOtp otp={otp} setOtp={setOtp} />

        {/* VERIFY BUTTON */}
        <TouchableOpacity
          style={[
            styles.verifyBtn,
            verifyMutation.isPending && { opacity: 0.7 },
          ]}
          onPress={handleVerify}
          disabled={verifyMutation.isPending}
          activeOpacity={0.9}
        >
          {verifyMutation.isPending ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.verifyText}>Verifikasi</Text>
          )}
        </TouchableOpacity>

        {/* RESEND */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={!canResend}
          style={{ marginTop: 20 }}
        >
          <Text style={[styles.resendText, { opacity: canResend ? 1 : 0.4 }]}>
            {canResend ? "Kirim ulang" : `Kirim ulang dalam ${timer}s`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C1C1C",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#6A6A6A",
    textAlign: "center",
    marginBottom: 40,
  },
  verifyBtn: {
    backgroundColor: "#7B2CBF",
    marginTop: 40,
    width: "80%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },
  verifyText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resendText: {
    color: "#7B2CBF",
    fontSize: 14,
    fontWeight: "600",
  },
});
