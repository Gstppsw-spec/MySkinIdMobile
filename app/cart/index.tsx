import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  LayoutChangeEvent,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import HeaderBack from "@/components/header/HeaderBack";
import CartProductTab from "@/components/cart/CartProductTab";
import CartServiceTab from "@/components/cart/CartServiceTab";
import CartTabs from "@/components/cart/CartTab";
import { useCustomerProductCart, useCustomerServiceCart } from "@/api/cart";
import DataStateView from "@/components/common/DataStateView";

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const customerId = useAuthStore((state) => state.customerId);
  const token = useAuthStore((state) => state.token);

  const [activeTab, setActiveTab] = useState<"product" | "service">("product");
  const [tabWidth, setTabWidth] = useState(0);

  const indicatorTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!customerId && !token) {
      router.replace("/authentication");
    }
  }, [customerId]);

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    refetch: refetchProduct,
    isRefetching: isRefetchingProduct,
  } = useCustomerProductCart(customerId as string);
  const {
    data: service,
    isLoading: isLoadingService,
    isError: isErrorService,
    refetch: refetchService,
    isRefetching: isRefetchingService,
  } = useCustomerServiceCart(customerId as string);

  useEffect(() => {
    Animated.timing(indicatorTranslate, {
      toValue: activeTab === "product" ? 0 : tabWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#F8FAFC" }]}>
      <HeaderBack title="Keranjang" />

      <CartTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        productCount={product && product?.length > 0 ? product.length : 0}
        serviceCount={service && service?.length > 0 ? service.length : 0}
      />

      <View style={styles.tabContentWrapper}>
        {activeTab === "product" ? (
          <DataStateView
            isLoading={isLoadingProduct}
            isError={isErrorProduct}
            data={product}
            onRetry={refetchProduct}
            emptyMessage="Belum ada produk di keranjang."
          />
        ) : (
          <DataStateView
            isLoading={isLoadingService}
            isError={isErrorService}
            data={service}
            onRetry={refetchService}
            emptyMessage="Belum ada service di keranjang."
          />
        )}

        {activeTab === "product" && product && product?.length > 0 && (
          <CartProductTab isDark={isDark} cart={product} />
        )}

        {activeTab === "service" && service && service?.length > 0 && (
          <CartServiceTab isDark={isDark} cart={service} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textDark: { color: "#94A3B8" },

  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    elevation: 2,
  },
  tabContainerDark: {
    backgroundColor: "#1E1B2E",
    borderBottomColor: "#2D2A40",
  },
  tabWrapper: { flexDirection: "row", position: "relative" },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginHorizontal: 2,
  },
  tabContent: { flexDirection: "row", alignItems: "center" },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748B",
    marginLeft: 8,
  },
  activeTabText: { color: "#7C3AED", fontWeight: "600" },
  activeTabTextDark: { color: "#8B5CF6" },
  tabBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  tabBadgeDark: { backgroundColor: "#2D2A40" },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  tabBadgeTextActive: { color: "#7C3AED" },
  tabContentWrapper: { flex: 1, paddingTop: 8 },
});
