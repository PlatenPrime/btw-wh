import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { ThemedIcon } from "@/components/themed";
import { Colors, SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useThemeTokenHex } from "@/hooks/use-theme-token";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { useTheme } from "@/providers/theme-provider";
import { getTokenColorWithOpacity } from "@/utils/color-tokens";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { background, theme } = useThemeColors();
  const { isOpen } = useSidebar();
  const { resolvedTheme } = useTheme();
  const themeMode = resolvedTheme === "dark" ? "dark" : "light";

  // Получаем цвета текста из токенов с fallback на старые цвета
  const selectedToken = themeMode === "light" ? "primary-600" : "primary-500";
  const tabIconSelectedHex = useThemeTokenHex(selectedToken);
  const tabIconDefaultHex = useThemeTokenHex("typography-500");

  const tabBarActiveTintColor =
    tabIconSelectedHex || Colors[themeMode].tabIconSelected;
  const tabBarInactiveTintColor =
    tabIconDefaultHex || Colors[themeMode].tabIconDefault;

  // Получаем цвет границы из токенов с opacity
  const borderColor = getTokenColorWithOpacity(
    "outline-200",
    0.3,
    theme as "light" | "dark"
  );

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
      backgroundColor: background.primary,
      borderTopColor: borderColor,
    },
    default: {
      backgroundColor: background.primary,
      borderTopColor: borderColor,
    },
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

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
        />
      </Tabs>
    </ProtectedRoute>
  );
}
