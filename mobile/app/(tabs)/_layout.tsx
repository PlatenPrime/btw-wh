import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { Colors, SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { resolvedTheme } = useTheme();
  const { isOpen } = useSidebar();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const themeColors = Colors[theme];

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
      backgroundColor: themeColors.background,
      borderTopColor: theme === "dark" ? "rgba(115, 116, 116, 0.3)" : "rgba(221, 220, 219, 0.3)",
    },
    default: {
      backgroundColor: themeColors.background,
      borderTopColor: theme === "dark" ? "rgba(115, 116, 116, 0.3)" : "rgba(221, 220, 219, 0.3)",
    },
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.tabIconSelected,
          tabBarInactiveTintColor: themeColors.tabIconDefault,
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
            tabBarIcon: ({ color }) => (
              <Icon family="MaterialIcons" name="home" size={28} color={SemanticColors.iconColors.teal} />
            ),
          }}
        />
        <Tabs.Screen
          name="arts"
          options={{
            title: "Артикули",
            tabBarIcon: ({ color }) => (
              <Icon family="MaterialIcons" name="article" size={28} color={SemanticColors.iconColors.sky} />
            ),
          }}
        />
        <Tabs.Screen
          name="warehouse"
          options={{
            title: "Склад",
            tabBarIcon: ({ color }) => (
              <Icon family="MaterialIcons" name="warehouse" size={28} color={SemanticColors.iconColors.yellow} />
            ),
          }}
        />
        <Tabs.Screen
          name="refiling"
          options={{
            title: "Поповнення",
            tabBarIcon: ({ color }) => (
              <Icon family="AntDesign" name="down-square" size={28} color={SemanticColors.iconColors.purple} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
