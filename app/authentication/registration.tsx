// screens/RegistrationScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useLoginUser, useRegistration } from "@/api";
import FormInput from "@/components/authentication/formInput";
import HeaderBack from "@/components/header/HeaderBack";
import HeaderAuthentication from "@/components/authentication/headerAuthentication";
import Toast from "react-native-toast-message";

export default function RegistrationScreen() {
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (token) {
      router.replace("/(tabs)");
    }
  }, [token]);

  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "google">(
    "email"
  );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCountry, setSelectedCountry] = useState({
    code: "ID",
    name: "Indonesia",
    dial_code: "+62",
    flag: "🇮🇩",
  });

  const registerMutation = useRegistration();

  const isValidEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const normalizePhone = (phone: string) => {
    if (!phone) return phone;
    return phone.startsWith("0") ? phone.substring(1) : phone;
  };

  const handleLogin = () => {
    if (!email && loginMethod == "email") {
      Toast.show({
        type: "info",
        text1: "Email tidak boleh kosong",
      });
      return;
    }

    if (!phone && loginMethod == "phone") {
      Toast.show({
        type: "info",
        text1: "Handphone tidak boleh kosong",
      });
      return;
    }

    if (loginMethod === "email" && !isValidEmail(email)) {
      Toast.show({
        type: "info",
        text1: "Format email tidak valid",
      });
      return;
    }

    if (!password) {
      Toast.show({
        type: "info",
        text1: "Password tidak boleh kosong",
      });
      return;
    }

    if (!name) {
      Toast.show({
        type: "info",
        text1: "Nama tidak boleh kosong",
      });
      return;
    }

    if (password?.length < 9) {
      Toast.show({
        type: "info",
        text1: "Password minimal 8 karakter",
      });
      return;
    }

    let formattedPhone = phone;
    if (loginMethod === "phone") {
      formattedPhone = normalizePhone(phone);
    }

    let payload: any = {};

    if (loginMethod === "phone") {
      payload = {
        name,
        loginMethod,
        otpType: loginMethod,
        password,
        phoneNumber: formattedPhone,
        countryCode: selectedCountry?.dial_code,
      };
    } else {
      payload = {
        name,
        loginMethod,
        otpType: loginMethod,
        email,
        password,
      };
    }

    registerMutation.mutate(payload, {
      onSuccess: (res) => {
        Toast.show({
          type: "success",
          text1: "Registrasi Berhasil",
          text2: "Silakan lanjutkan proses berikutnya",
        });
        router.push({
          pathname: "/authentication/verificationOtp",
          params: {
            customerId: res?.data?.customerId,
          },
        });
      },
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: "Registrasi Gagal",
          text2: err.response?.data?.message || "Terjadi kesalahan",
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#F8F5FF", "#FFFFFF"]}
        style={styles.gradientBackground}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <HeaderAuthentication title="Registrasi Akun" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header dengan tombol kembali */}
          {/* <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" color={"#7B2CBF"} size={24} />
            </Pressable>
            
            <View style={styles.titleSection}>
              <Text style={styles.title}>Buat Akun Baru</Text>
              <Text style={styles.subtitle}>
                Daftar untuk mulai menggunakan aplikasi
              </Text>
            </View>
          </View> */}

          {/* Form Registrasi */}
          <View style={styles.formCard}>
            {/* Toggle Metode Registrasi */}
            <View style={styles.methodToggle}>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  loginMethod === "email" && styles.methodButtonActive,
                ]}
                onPress={() => setLoginMethod("email")}
              >
                <Ionicons
                  name="mail"
                  size={18}
                  color={loginMethod === "email" ? "#FFFFFF" : "#7B2CBF"}
                />
                <Text
                  style={[
                    styles.methodText,
                    loginMethod === "email" && styles.methodTextActive,
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.methodButton,
                  loginMethod === "phone" && styles.methodButtonActive,
                ]}
                onPress={() => setLoginMethod("phone")}
              >
                <Ionicons
                  name="call"
                  size={18}
                  color={loginMethod === "phone" ? "#FFFFFF" : "#7B2CBF"}
                />
                <Text
                  style={[
                    styles.methodText,
                    loginMethod === "phone" && styles.methodTextActive,
                  ]}
                >
                  WhatsApp
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Input */}
            <View style={styles.formInputs}>
              <FormInput
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChangeText={setName}
                icon="person-outline"
              />

              {loginMethod === "email" ? (
                <FormInput
                  label="Alamat Email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  icon="mail-outline"
                />
              ) : (
                <FormInput
                  label="Nomor WhatsApp"
                  placeholder="812 3456 7890"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  icon="call-outline"
                  countryCode={true}
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                />
              )}

              <FormInput
                label="Kata Sandi"
                placeholder="Minimal 8 karakter"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                icon="lock-closed-outline"
              />
            </View>

            {/* Tombol Daftar */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                registerMutation.isPending && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={registerMutation.isPending}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#7B2CBF", "#9D4EDD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {registerMutation.isPending ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.registerText}>Daftar Sekarang</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>atau lanjutkan dengan</Text>
              <View style={styles.divider} />
            </View>

            {/* Opsi Alternatif */}
            <TouchableOpacity
              style={styles.alternativeButton}
              onPress={() =>
                setLoginMethod(loginMethod === "email" ? "phone" : "email")
              }
            >
              <View style={styles.alternativeIconContainer}>
                <Ionicons
                  name={loginMethod === "email" ? "logo-whatsapp" : "mail"}
                  size={20}
                  color="#7B2CBF"
                />
              </View>
              <Text style={styles.alternativeText}>
                {loginMethod === "email"
                  ? "Daftar dengan WhatsApp"
                  : "Daftar dengan Email"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Sudah punya akun?</Text>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Text style={styles.footerLink}> Masuk di sini</Text>
            </TouchableOpacity>
          </View>

          {/* Terms & Privacy */}
          <Text style={styles.termsText}>
            Dengan mendaftar, Anda menyetujui{" "}
            <Text style={styles.termsLink}>Syarat Layanan</Text> dan{" "}
            <Text style={styles.termsLink}>Kebijakan Privasi</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3EFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  titleSection: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#7B2CBF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  methodToggle: {
    flexDirection: "row",
    backgroundColor: "#F3EFFF",
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  methodButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  methodButtonActive: {
    backgroundColor: "#7B2CBF",
    shadowColor: "#7B2CBF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  methodText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7B2CBF",
  },
  methodTextActive: {
    color: "#FFFFFF",
  },
  formInputs: {
    gap: 16,
    marginBottom: 24,
  },
  registerButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#7B2CBF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8E6F2",
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  alternativeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E8E6F2",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 12,
  },
  alternativeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F8F5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  alternativeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4A4A6A",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#666",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7B2CBF",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  termsLink: {
    color: "#7B2CBF",
    fontWeight: "500",
  },
});
