import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { ThemedIcon } from "@/components/themed";
import { Colors, SemanticColors } from "@/constants/theme";
import { getThemeColorWithOpacity } from "@/hooks/use-theme-colors";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { useTheme } from "@/providers/theme-provider";
import { Tabs, usePathname, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { isOpen } = useSidebar();
  const { resolvedTheme } = useTheme();
  const themeMode = resolvedTheme === "dark" ? "dark" : "light";
  const pathname = usePathname();
  const router = useRouter();

  const tabBarActiveTintColor = Colors[themeMode].tabIconSelected;
  const tabBarInactiveTintColor = Colors[themeMode].tabIconDefault;

  // Получаем цвет границы с opacity
  // outline-200: light: #DDDCDB (221, 220, 219), dark: #737474 (115, 116, 116)
  const outline200Color = themeMode === "light" ? "#DDDCDB" : "#737474";
  const borderColor = getThemeColorWithOpacity(outline200Color, 0.3);

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
      backgroundColor: SemanticColors.card.bg[themeMode],
      borderTopColor: borderColor,
    },
    default: {
      backgroundColor: SemanticColors.card.bg[themeMode],
      borderTopColor: borderColor,
    },
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

  // Обработчик для вкладки "Артикули"
  const handleArtsTabPress = useCallback(
    (e: any) => {
      // Проверяем pathname синхронно в момент вызова
      const currentPath = pathname;
      const isOnArtsTab = currentPath.startsWith("/(tabs)/arts");
      // Нормализуем путь для проверки (убираем trailing slash)
      const normalizedPath = currentPath.replace(/\/$/, "");
      const isOnArtsIndex = normalizedPath === "/(tabs)/arts";

      if (isOnArtsTab && !isOnArtsIndex) {
        e.preventDefault();
        // Используем setTimeout для асинхронной навигации после preventDefault
        setTimeout(() => {
          router.push("/(tabs)/arts" as any);
        }, 0);
      }
    },
    [pathname, router]
  );

  // Обработчик для вкладки "Склад"
  const handleWarehouseTabPress = useCallback(
    (e: any) => {
      // Проверяем pathname синхронно в момент вызова
      const currentPath = pathname;
      const isOnWarehouseTab = currentPath.startsWith("/(tabs)/warehouse");
      // Нормализуем путь для проверки (убираем trailing slash)
      const normalizedPath = currentPath.replace(/\/$/, "");
      const isOnWarehouseIndex = normalizedPath === "/(tabs)/warehouse";

      if (isOnWarehouseTab && !isOnWarehouseIndex) {
        e.preventDefault();
        // Используем setTimeout для асинхронной навигации после preventDefault
        setTimeout(() => {
          router.push("/(tabs)/warehouse" as any);
        }, 0);
      }
    },
    [pathname, router]
  );

  // Обработчик для вкладки "Поповнення"
  const handleRefilingTabPress = useCallback(
    (e: any) => {
      // Проверяем pathname синхронно в момент вызова
      const currentPath = pathname;
      const isOnRefilingTab = currentPath.startsWith("/(tabs)/refiling");
      // Нормализуем путь для проверки (убираем trailing slash)
      const normalizedPath = currentPath.replace(/\/$/, "");
      const isOnRefilingIndex = normalizedPath === "/(tabs)/refiling";

      if (isOnRefilingTab && !isOnRefilingIndex) {
        e.preventDefault();
        // Используем setTimeout для асинхронной навигации после preventDefault
        setTimeout(() => {
          router.push("/(tabs)/refiling" as any);
        }, 0);
      }
    },
    [pathname, router]
  );

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor,
          tabBarInactiveTintColor,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Головна",
            tabBarLabel: "Головна",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="home"
                size={28}
                color={SemanticColors.iconColors.teal}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="arts"
          options={{
            title: "Артикули",
            tabBarLabel: "Артикули",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="article"
                size={28}
                color={SemanticColors.iconColors.sky}
              />
            ),
          }}
          listeners={{
            tabPress: handleArtsTabPress,
          }}
        />
        <Tabs.Screen
          name="warehouse"
          options={{
            title: "Склад",
            tabBarLabel: "Склад",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="warehouse"
                size={28}
                color={SemanticColors.iconColors.yellow}
              />
            ),
          }}
          listeners={{
            tabPress: handleWarehouseTabPress,
          }}
        />
        <Tabs.Screen
          name="refiling"
          options={{
            title: "Поповнення",
            tabBarLabel: "Поповнення",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="AntDesign"
                name="down-square"
                size={28}
                color={SemanticColors.iconColors.purple}
              />
            ),
          }}
          listeners={{
            tabPress: handleRefilingTabPress,
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
