import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/layout/sidebar/SidebarProvider";
import { config } from "@/components/ui/gluestack-ui-provider/config";
import "@/global.css";
import { Providers } from "@/providers/providers";
import { useTheme } from "@/providers/theme-provider";

function AppContent() {
  const { resolvedTheme } = useTheme();
  const themeMode = resolvedTheme === "dark" ? "dark" : "light";
  const { setColorScheme } = useColorScheme();

  // Синхронизируем тему с NativeWind
  useEffect(() => {
    setColorScheme(resolvedTheme);
  }, [resolvedTheme, setColorScheme]);

  return (
    <SafeAreaProvider>
      <View
        className={resolvedTheme === "dark" ? "dark" : ""}
        style={[config[themeMode], { flex: 1, height: "100%", width: "100%" }]}
      >
        <NavigationThemeProvider
          value={resolvedTheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SidebarProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen
                name="unauthorized"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="forbidden" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <AppSidebar />
            <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
          </SidebarProvider>
        </NavigationThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
