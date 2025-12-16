// screens/LoginScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useLoginUser } from "@/api";
import FormInput from "@/components/authentication/formInput";
import HeaderBack from "@/components/header/HeaderBack";
import HeaderAuthentication from "@/components/authentication/headerAuthentication";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

export default function LoginScreen() {
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
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "ID",
    name: "Indonesia",
    dial_code: "+62",
    flag: "🇮🇩",
  });

  const loginMutation = useLoginUser();

  const normalizePhone = (phone: string) => {
    if (!phone) return phone;
    return phone.startsWith("0") ? phone.substring(1) : phone;
  };

  const handleLogin = () => {
    let formattedPhone = phone;
    if (loginMethod === "phone") {
      formattedPhone = normalizePhone(phone);
    }
    const payload =
      loginMethod === "email"
        ? { email, password, loginMethod }
        : loginMethod === "phone"
        ? {
            phoneNumber: formattedPhone,
            password,
            loginMethod,
            countryCode: selectedCountry?.dial_code,
          }
        : { loginMethod: "google" };

    loginMutation.mutate(payload, {
      onSuccess: (res) => {
        Toast.show({
          type: "success",
          text1: "Login Berhasil",
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
          text1: "Login Gagal",
          text2: err.response?.data?.message || "Terjadi kesalahan",
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <LinearGradient
        colors={["#FFFFFF", "#F8F5FF", "#FFFFFF"]}
        style={styles.gradientBackground}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <HeaderAuthentication />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header dengan Back Button */}
          {/* <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#1A1A2E" />
            </Pressable>
          </View> */}

          {/* Welcome Section */}
          {/* <View style={styles.welcomeSection}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={["#7B2CBF", "#9D4EDD"]}
                style={styles.logoGradient}
              >
                <Ionicons name="lock-closed" size={32} color="#FFFFFF" />
              </LinearGradient>
            </View>
            
            <Text style={styles.welcomeTitle}>Selamat Datang Kembali</Text>
            <Text style={styles.welcomeSubtitle}>
              Masuk untuk melanjutkan ke akun Anda
            </Text>
          </View> */}

          {/* Login Form Card */}
          <View style={styles.formCard}>
            {/* Toggle Login Method */}
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

            {/* Form Inputs */}
            <View style={styles.formInputs}>
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
                  label="No Whatsapp"
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
                placeholder="Masukkan kata sandi"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                icon="lock-closed-outline"
              />

              {/* Remember Me & Forgot Password */}
              <View style={styles.rememberForgotRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Ingat saya</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPassword}>Lupa kata sandi?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                loginMutation.isPending && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={loginMutation.isPending}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#7B2CBF", "#9D4EDD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {loginMutation.isPending ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.loginText}>Masuk ke Akun</Text>
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

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsContainer}>
              {/* Google Login */}
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <View style={styles.socialIconContainer}>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
                    }}
                    style={styles.googleIcon}
                  />
                </View>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              {/* Method Switch Button */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() =>
                  setLoginMethod(loginMethod === "email" ? "phone" : "email")
                }
                activeOpacity={0.8}
              >
                <View style={styles.socialIconContainer}>
                  <Ionicons
                    name={loginMethod === "email" ? "logo-whatsapp" : "mail"}
                    size={24}
                    color="#7B2CBF"
                  />
                </View>
                <Text style={styles.socialText}>
                  {loginMethod === "email" ? "WhatsApp" : "Email"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Link */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Belum punya akun?</Text>
            <TouchableOpacity
              onPress={() => router.push("/authentication/registration")}
              activeOpacity={0.7}
            >
              <Text style={styles.registerLink}> Buat akun baru</Text>
            </TouchableOpacity>
          </View>

          {/* Terms Info */}
          <Text style={styles.termsText}>
            Dengan melanjutkan, Anda menyetujui{" "}
            <Text style={styles.termsLink}>Syarat Layanan</Text> kami
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
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3EFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7B2CBF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
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
  rememberForgotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1C4E9",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7B2CBF",
    borderColor: "#7B2CBF",
  },
  rememberText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#7B2CBF",
    fontWeight: "600",
  },
  loginButton: {
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
  loginText: {
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
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E8E6F2",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  socialIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 2,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A6A",
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 16,
  },
  registerText: {
    fontSize: 13,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7B2CBF",
  },
  termsText: {
    textAlign: "center",
    fontSize: 13,
    color: "#999",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  termsLink: {
    color: "#7B2CBF",
    fontWeight: "500",
  },
});
