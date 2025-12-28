import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { LogBox, View } from "react-native";

import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/layout/sidebar/SidebarProvider";
import { config } from "@/components/ui/gluestack-ui-provider/config";
import "@/global.css";
import { Providers } from "@/providers/providers";
import { useTheme } from "@/providers/theme-provider";

// Перехватываем и игнорируем предупреждения Reanimated о чтении/записи value во время рендера
// Эти предупреждения приходят из сторонних библиотек (@gorhom/bottom-sheet, @legendapp/motion)
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const message = args[0];
  if (
    typeof message === "string" &&
    (message.includes(
      "[Reanimated] Reading from `value` during component render"
    ) ||
      message.includes(
        "[Reanimated] Writing to `value` during component render"
      ))
  ) {
    return; // Игнорируем эти предупреждения
  }
  originalWarn.apply(console, args);
};

// Дополнительная фильтрация через LogBox
LogBox.ignoreLogs([
  /\[Reanimated\] Reading from `value` during component render/,
  /\[Reanimated\] Writing to `value` during component render/,
]);

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
