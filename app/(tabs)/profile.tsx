// app/profile.tsx
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useStore from "@/store/useStore";
import { LinearGradient } from "expo-linear-gradient";
import RequiredLogin from "@/components/required/required_login";
import { useAuthStore } from "@/store/authStore";
import ConsultationHeader from "@/components/header/consultationHeader";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileSection from "@/components/profile/profileSection";
import ProfileItem from "@/components/profile/profileItem";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const employeeDetails = useStore((state) => state.employeeDetails);
  const logout = useAuthStore((state) => state.logout);
  const customerId = useAuthStore((state) => state.customerId);

  if (!customerId) {
    return <RequiredLogin />;
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          router.push("/authentication"), logout();
        },
      },
    ]);
  };

  const handleContactSupport = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleSendEmail = () => {
    Linking.openURL("mailto:support@company.com");
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://company.com/privacy");
  };

  const handleTermsOfService = () => {
    Linking.openURL("https://company.com/terms");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFF" }]}>
      <ConsultationHeader title="Profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader
          employeeId={employeeDetails?.employeeid || "N/A"}
          name="Gunawan Sitepu"
          isDark={isDark}
          email="gunawang938@gmail.com"
        />

        {/* ACCOUNT */}
        <ProfileSection title="Akun Saya" isDark={isDark}>
          {/* <ProfileItem
            icon="person-outline"
            title="Data Diri"
            // onPress={() => router.push("/account/info")}
          /> */}
          <ProfileItem
            icon="location-outline"
            title="Pengaturan Alamat"
            onPress={() => router.push("/address")}
            showArrow={true}
          />
          <ProfileItem
            icon="shield-checkmark-outline"
            title="Keamanan Akun"
            // onPress={() => router.push("/account/security")}
          />
        </ProfileSection>

        {/* ORDERS */}
        <ProfileSection title="Pesanan" isDark={isDark}>
          <ProfileItem
            icon="cube-outline"
            title="Pesanan Saya"
            // onPress={() => router.push("/orders")}
          />
          <ProfileItem
            icon="time-outline"
            title="Menunggu Pembayaran"
            // onPress={() => router.push("/orders/pending")}
          />
          <ProfileItem
            icon="bicycle-outline"
            title="Dalam Pengiriman"
            // onPress={() => router.push("/orders/shipping")}
          />
          <ProfileItem
            icon="checkmark-done-outline"
            title="Pesanan Selesai"
            // onPress={() => router.push("/orders/completed")}
          />
        </ProfileSection>

        {/* PROMO */}
        <ProfileSection title="Promo & Loyalty" isDark={isDark}>
          <ProfileItem
            icon="pricetag-outline"
            title="Voucher Saya"
            // onPress={() => router.push("/promo/vouchers")}
          />
          <ProfileItem
            icon="gift-outline"
            title="Kode Promo"
            // onPress={() => router.push("/promo/code")}
          />
          <ProfileItem
            icon="star-outline"
            title="Loyalty / Points"
            // onPress={() => router.push("/loyalty")}
          />
        </ProfileSection>

        {/* CUSTOMER SERVICE */}
        <ProfileSection title="Layanan Pelanggan" isDark={isDark}>
          <ProfileItem
            icon="help-circle-outline"
            title="Pusat Bantuan"
            // onPress={() => router.push("/help")}
          />
          <ProfileItem
            icon="chatbubble-ellipses-outline"
            title="Chat Customer Service"
            // onPress={() => router.push("/help/chat")}
          />
          <ProfileItem
            icon="alert-circle-outline"
            title="Komplain Pesanan"
            // onPress={() => router.push("/help/complaint")}
          />
        </ProfileSection>

        {/* SETTINGS */}
        {/* <ProfileSection title="Pengaturan" isDark={isDark}>
          <ProfileItem
            icon="notifications-outline"
            title="Notifikasi"
            // onPress={() => router.push("/settings/notifications")}
          />
          <ProfileItem
            icon="language-outline"
            title="Bahasa"
            // onPress={() => router.push("/settings/language")}
          />
          <ProfileItem
            icon="color-palette-outline"
            title="Tema Aplikasi"
            // onPress={() => router.push("/settings/theme")}
          />
        </ProfileSection> */}

        {/* LEGAL */}
        <ProfileSection title="Tentang" isDark={isDark}>
          <ProfileItem
            icon="document-text-outline"
            title="Kebijakan Privasi"
            onPress={handlePrivacyPolicy}
          />
          <ProfileItem
            icon="shield-outline"
            title="Syarat & Ketentuan"
            onPress={handleTermsOfService}
          />
        </ProfileSection>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: isDark ? "#FF3B30" : "#FF3B30" },
            ]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text
            style={[styles.versionText, { color: isDark ? "#666" : "#999" }]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
  },
});
