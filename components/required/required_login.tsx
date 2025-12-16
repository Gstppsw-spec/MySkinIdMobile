import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useStore from "@/store/useStore";
import { LinearGradient } from "expo-linear-gradient";

const RequiredLogin = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <LinearGradient
        colors={["#1A122D", "#2B1D4A", "#F5EFFF"]}
        style={styles.gradientBackground}
      />

      <View style={styles.centerContent}>
        <Ionicons
          name="lock-closed-outline"
          size={70}
          color={"#9B5DE5"}
          style={{ marginBottom: 20 }}
        />

        <Text style={[styles.title, { color: "#E9E4F0" }]}>Login Required</Text>

        <Text style={[styles.subtitle, { color: "#CBBBDD" }]}>
          Please log in or sign up to get the full experience.
        </Text>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: isDark ? "#9B5DE5" : "#7B2CBF" },
          ]}
          onPress={() => router.push("/authentication")}
        >
          <Ionicons
            name="log-in-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.loginText}>LOG IN OR SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* ===== Bagian Support ===== */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Support</Text>

        <TouchableOpacity
          style={styles.supportItem}
          onPress={() => Linking.openURL("https://instagram.com/oriskin.id")}
        >
          <View style={styles.supportLeft}>
            <Ionicons
              name="logo-instagram"
              size={22}
              color={"#9B5DE5"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.supportText}>Contact us on Instagram</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color={"#9B5DE5"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportItem}
          onPress={() =>
            Linking.openURL("mailto:support@oriskin.id?subject=Support Request")
          }
        >
          <View style={styles.supportLeft}>
            <Ionicons
              name="mail-outline"
              size={22}
              color={"#9B5DE5"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.supportText}>Email Customer Support</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color={"#9B5DE5"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequiredLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#9B5DE5",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  supportSection: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7B2CBF",
    marginBottom: 10,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F5FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
  },
  supportLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportText: {
    color: "#3C096C",
    fontSize: 13,
    fontWeight: "500",
  },
});
