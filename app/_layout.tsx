import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "../config/toastConfig";
import useStore from "../store/useStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const employeeDetails = useStore((state) => state.employeeDetails);

  useEffect(() => {
    const navigate = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 200);
      }
    };

    navigate();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
        >
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                animation: "ios_from_right",
                gestureEnabled: true,
                gestureDirection: "horizontal",
                animationDuration: 100,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="authentication"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="filter_location"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="filter_category"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="filter_result"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="filter_category_all"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="cart" options={{ headerShown: false }} />
              <Stack.Screen name="search" options={{ headerShown: false }} />
              <Stack.Screen name="location" options={{ headerShown: false }} />
              <Stack.Screen
                name="consultation"
                options={{ headerShown: false }}
              />

              <Stack.Screen name="product" options={{ headerShown: false }} />

              <Stack.Screen name="treatment" options={{ headerShown: false }} />
              <Stack.Screen name="address" options={{ headerShown: false }} />
              <Stack.Screen name="checkout" options={{ headerShown: false }} />

              <Stack.Screen
                name="deliveryMethod"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="paymentMethod"
                options={{ headerShown: false }}
              />

              <Stack.Screen name="+not-found" />
            </Stack>
            <Toast config={toastConfig} />
          </QueryClientProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
